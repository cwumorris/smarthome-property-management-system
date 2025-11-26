# Custom Domain Setup Guide

This guide explains how to configure a custom domain for your property management organization on Swifthomes.

## Overview

Swifthomes supports two types of domain configurations:

1. **Subdomain** (e.g., `yourcompany.swifthomes.com`) - Quick setup, no DNS configuration needed
2. **Custom Domain** (e.g., `properties.yourcompany.com`) - Use your own domain with full white-label support

## Custom Domain Setup Steps

### Step 1: Choose Your Domain

During onboarding (Step 2: Domain Setup), select "Use Your Own Custom Domain" and enter your desired domain.

Examples:
- `properties.yourcompany.com`
- `portal.yourcompany.com`
- `rentals.yourcompany.com`

### Step 2: Configure DNS Records

After completing onboarding, you'll need to add DNS records to your domain provider (GoDaddy, Namecheap, Cloudflare, etc.).

#### Required DNS Records

**Option A: CNAME Record (Recommended)**
\`\`\`
Type: CNAME
Name: properties (or your subdomain)
Value: cname.swifthomes.com
TTL: 3600 (1 hour)
\`\`\`

**Option B: A Record**
\`\`\`
Type: A
Name: properties (or your subdomain)
Value: 192.0.2.1 (Swifthomes IP address - provided after setup)
TTL: 3600
\`\`\`

### Step 3: Domain Verification

1. After adding DNS records, navigate to **Admin → Settings → Domain Settings**
2. Click "Verify Domain"
3. Wait for DNS propagation (typically 5-30 minutes, can take up to 48 hours)
4. Once verified, your custom domain will be active

### Step 4: SSL Certificate

Swifthomes automatically provisions SSL certificates for custom domains using Let's Encrypt. This process happens automatically after domain verification and takes 5-10 minutes.

## DNS Configuration Examples

### Cloudflare
\`\`\`
1. Log in to Cloudflare Dashboard
2. Select your domain
3. Go to DNS → Records
4. Click "Add record"
5. Select CNAME
6. Name: properties
7. Target: cname.swifthomes.com
8. Proxy status: DNS only (grey cloud)
9. Click Save
\`\`\`

### GoDaddy
\`\`\`
1. Log in to GoDaddy
2. Go to My Products → DNS
3. Click "Add" under Records
4. Type: CNAME
5. Name: properties
6. Value: cname.swifthomes.com
7. TTL: 1 Hour
8. Click Save
\`\`\`

### Namecheap
\`\`\`
1. Log in to Namecheap
2. Domain List → Manage
3. Advanced DNS tab
4. Add New Record
5. Type: CNAME Record
6. Host: properties
7. Value: cname.swifthomes.com
8. TTL: Automatic
9. Save
\`\`\`

## Testing Your Custom Domain

After DNS propagation, test your custom domain:

1. Open `https://properties.yourcompany.com` in your browser
2. You should see your branded Swifthomes login page
3. All branding (logo, colors) should reflect your organization settings

## Troubleshooting

### Domain Not Working After 24 Hours

**Check DNS propagation:**
\`\`\`bash
nslookup properties.yourcompany.com
# or
dig properties.yourcompany.com
\`\`\`

Expected result should point to Swifthomes servers.

**Common Issues:**
- DNS records not saved properly
- Wrong record type (use CNAME, not A record if unsure)
- Cloudflare proxy enabled (should be DNS only)
- TTL too high (try reducing to 300 seconds)

### SSL Certificate Issues

If you see SSL warnings:
1. Wait 10 more minutes for certificate provisioning
2. Clear browser cache and try again
3. Contact support if issue persists after 1 hour

### Email Not Working

If you use email on the same domain:
1. Don't point your root domain (@yourcompany.com) to Swifthomes
2. Only point subdomains (properties.yourcompany.com)
3. Keep your MX records unchanged

## Switching Between Subdomain and Custom Domain

You can switch domain types anytime:

1. Go to **Admin → Settings → Domain Settings**
2. Click "Change Domain Configuration"
3. Select new domain type
4. Follow setup instructions

**Note:** Changing domains will require users to access the new URL. Notify your team before switching.

## White-Label Mode

Custom domains enable full white-label mode:

- Your domain in browser address bar
- Your logo and branding throughout
- No "Powered by Swifthomes" footer (Enterprise plan)
- Custom email domain for notifications
- Custom mobile app (Enterprise plan)

## Support

Need help setting up your custom domain?

- Email: support@swifthomes.com
- Live Chat: Available in Admin Dashboard
- Phone: +233 699 9907 (Mon-Fri, 9am-6pm GMT)

DNS propagation typically takes 5-30 minutes but can take up to 48 hours. Please allow sufficient time before contacting support.
