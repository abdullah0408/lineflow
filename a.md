# Secure VPS Setup & Deployment Guide (Sequenced & Improved)

**Follow this exact order to avoid SSH lockouts and ensure proper configuration:**

---

## 1. Initial System Updates & User Setup

### Update System & Install Unattended Upgrades
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```
```bash
# Enable auto-reboot after updates
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```
Add/Uncomment:
```bash
Unattended-Upgrade::Automatic-Reboot "true";
```

### Create Non-Root User
```bash
sudo adduser abdullah && sudo usermod -aG sudo abdullah
```

---

## 2. SSH Configuration (Critical First Step)

### Change SSH Port & Disable Root Login
```bash
sudo nano /etc/ssh/sshd_config
```
Modify:
```bash
Port 717                  # Replace default port
PermitRootLogin no        # Disable root login
AddressFamily inet        # Force IPv4
```

### Restart SSH Service
```bash
sudo systemctl restart ssh
```

---

## 3. Firewall (UFW) Setup

### Allow New SSH Port First!
```bash
sudo ufw allow 717/tcp    # Must match SSH port
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
```

### Block ICMP Ping (Optional)
```bash
sudo nano /etc/ufw/before.rules
```
Add before `COMMIT`:
```bash
-A ufw-before-input -p icmp --icmp-type echo-request -j DROP
```
```bash
sudo ufw reload
```

---

## 4. Install Fail2Ban for SSH Protection

### Configure for Custom SSH Port
```bash
sudo apt install fail2ban -y
sudo nano /etc/fail2ban/jail.local
```
Add:
```ini
[sshd]
enabled = true
port = 717
maxretry = 5
bantime = 3600
```
```bash
sudo systemctl restart fail2ban
```

---

## 5. Install Core Software Stack

### Node.js, Nginx, Certbot
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

### Docker & Docker Compose
```bash
# Add Docker repo
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## 6. WireGuard VPN Setup (wg-easy)

### Docker Compose for wg-easy (Recommended)
```bash
mkdir ~/wg-easy && cd ~/wg-easy
nano docker-compose.yml
```
Paste:
```yaml
version: '3.8'
services:
  wg-easy:
    image: weejewel/wg-easy
    container_name: wg-easy
    environment:
      - WG_HOST=your-vps-ip       # Replace with your IP
      - PASSWORD=your-strong-password
    ports:
      - "51820:51820/udp"
      - "51821:51821/tcp"
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.ip_forward=1
      - net.ipv4.conf.all.src_valid_mark=1
    restart: unless-stopped
```
```bash
docker compose up -d
sudo ufw allow 51820/udp
```

---

## 7. Reverse Proxy for WireGuard (Nginx)

### Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/vpn
```
Paste (replace `vpn.yourdomain.com`):
```nginx
server {
    listen 80;
    server_name vpn.yourdomain.com;

    location / {
        proxy_pass http://localhost:51821;
        include proxy_params;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/vpn /etc/nginx/sites-enabled/
sudo certbot --nginx -d vpn.yourdomain.com
sudo systemctl restart nginx
```

---

## 8. Nextcloud Deployment (Docker Compose)

### Create Project Directory
```bash
mkdir ~/nextcloud && cd ~/nextcloud
nano docker-compose.yml
```
Paste (update passwords!):
```yaml
version: '3.9'

services:
  nextcloud:
    image: nextcloud:latest
    ports:
      - 8000:80
    volumes:
      - nextcloud_data:/var/www/html
    depends_on:
      - db
    environment:
      - NEXTCLOUD_TRUSTED_DOMAINS=yourdomain.com
      - MYSQL_HOST=db
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=your-db-password
    restart: unless-stopped

  db:
    image: mariadb:latest
    volumes:
      - db_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=your-root-password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=your-db-password
    restart: unless-stopped

volumes:
  nextcloud_data:
  db_data:
```

### Start Nextcloud
```bash
docker compose up -d
```

---

## 9. Reverse Proxy for Nextcloud

### Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/nextcloud
```
Paste (replace `cloud.yourdomain.com`):
```nginx
server {
    listen 80;
    server_name cloud.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        include proxy_params;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/nextcloud /etc/nginx/sites-enabled/
sudo certbot --nginx -d cloud.yourdomain.com
sudo systemctl restart nginx
```

---

## 10. Finalize Nextcloud Setup

### Add Trusted Domains via CLI (No Manual Editing)
```bash
docker exec -it nextcloud /bin/bash
occ config:system:set trusted_domains 1 --value=cloud.yourdomain.com
occ config:system:set trusted_domains 2 --value=your-vps-ip
exit
```

---

## Critical Improvements Made:
1. **SSH First**: Configure SSH port **before** enabling UFW to prevent lockouts.
2. **Docker Compose**: Used for both WireGuard and Nextcloud for consistency.
3. **Port Mapping**: Fixed Nextcloud port mapping (`8000:80`) for proper reverse proxy.
4. **Trusted Domains**: Configured via CLI instead of manual file editing.
5. **Security**: Added strong password placeholders and explicit environment variables.
6. **UFW Order**: Firewall rules applied **after** SSH configuration.

**Always:**
- Replace all placeholders (`yourdomain.com`, passwords, IPs) with actual values.
- Test SSH access after critical changes.
- Backup configurations before modifications.