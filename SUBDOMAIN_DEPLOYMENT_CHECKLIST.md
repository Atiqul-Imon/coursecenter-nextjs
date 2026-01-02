# Subdomain Deployment Checklist for coursecenter.pixelforgebd.com

## Overview
This document outlines all potential issues and fixes needed when deploying to the subdomain `coursecenter.pixelforgebd.com` via Cloudflare and Vercel.

## ✅ Issues Found & Fixes Required

### 1. Environment Variables
**Issue**: `NEXT_PUBLIC_APP_URL` needs to be set to the new subdomain.

**Fix Required**:
- Set `NEXT_PUBLIC_APP_URL=https://coursecenter.pixelforgebd.com` in Vercel environment variables

**Location**: Vercel Dashboard → Project Settings → Environment Variables

---

### 2. Next.js Image Configuration
**Status**: ✅ Already configured correctly
- ImageKit domain (`ik.imagekit.io`) is already in `remotePatterns`
- No changes needed

**File**: `next.config.ts`

---

### 3. ImageKit CORS Settings
**Issue**: ImageKit may need the new domain whitelisted for CORS.

**Fix Required**:
1. Go to ImageKit Dashboard → Settings → Security
2. Add `https://coursecenter.pixelforgebd.com` to allowed origins
3. Add `https://*.pixelforgebd.com` if using wildcard (optional)

---

### 4. Authentication (JWT)
**Status**: ✅ No domain-specific issues
- JWT tokens are stored in localStorage (client-side)
- No cookie domain restrictions
- Works with any domain

**No changes needed**

---

### 5. API Routes
**Status**: ✅ No hardcoded domains found
- All API routes use relative paths (`/api/...`)
- No CORS configuration needed (same-origin requests)

**No changes needed**

---

### 6. Cloudflare Configuration
**Required Settings**:

1. **DNS Configuration**:
   - Type: `CNAME`
   - Name: `coursecenter`
   - Target: `cname.vercel-dns.com` (or your Vercel project domain)
   - Proxy: Enabled (orange cloud)

2. **SSL/TLS Settings**:
   - SSL/TLS encryption mode: **Full (strict)**
   - Always Use HTTPS: **On**
   - Minimum TLS Version: **1.2**

3. **Page Rules** (Optional but recommended):
   - `https://coursecenter.pixelforgebd.com/*`
     - Always Use HTTPS: On
     - Cache Level: Standard

4. **Security Settings**:
   - Security Level: Medium
   - Bot Fight Mode: On (optional)
   - Challenge Passage: 30 minutes

---

### 7. Vercel Domain Configuration
**Steps**:
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add `coursecenter.pixelforgebd.com`
3. Vercel will provide DNS records
4. Configure in Cloudflare as per step 6

---

### 8. Cookie Consent (GDPR)
**Status**: ✅ No domain-specific issues
- Cookie consent uses localStorage
- No domain restrictions

**No changes needed**

---

### 9. External Service URLs
**Check Required**:
- ✅ ImageKit: Already configured for any domain
- ✅ No other external services with domain restrictions found

---

### 10. SEO & Meta Tags
**Status**: ⚠️ May need updates
- Check if any hardcoded URLs in meta tags
- Update sitemap.xml if exists
- Update robots.txt if exists

**Action**: Review `app/layout.tsx` for any hardcoded URLs

---

## 🔧 Implementation Steps

### Step 1: Update Environment Variables in Vercel
```bash
NEXT_PUBLIC_APP_URL=https://coursecenter.pixelforgebd.com
```

### Step 2: Configure Cloudflare DNS
1. Add CNAME record pointing to Vercel
2. Enable proxy (orange cloud)
3. Set SSL to Full (strict)

### Step 3: Add Domain in Vercel
1. Add `coursecenter.pixelforgebd.com` in Vercel dashboard
2. Verify DNS configuration

### Step 4: Update ImageKit CORS
1. Add new domain to ImageKit allowed origins
2. Test image uploads

### Step 5: Test Deployment
1. Verify HTTPS works
2. Test authentication
3. Test image uploads
4. Test all API routes
5. Verify cookie consent works

---

## 🚨 Potential Issues & Solutions

### Issue 1: Mixed Content (HTTP/HTTPS)
**Symptom**: Browser blocks HTTP resources on HTTPS page
**Solution**: Ensure all external resources use HTTPS
**Status**: ✅ Already using HTTPS for ImageKit

### Issue 2: CORS Errors
**Symptom**: API requests blocked by browser
**Solution**: Not applicable (same-origin requests)
**Status**: ✅ No CORS issues expected

### Issue 3: Cookie Issues
**Symptom**: Cookies not persisting
**Solution**: Not applicable (using localStorage)
**Status**: ✅ No cookie domain issues

### Issue 4: Image Loading Issues
**Symptom**: Images not loading from ImageKit
**Solution**: Update ImageKit CORS settings
**Action Required**: ✅ Add domain to ImageKit

### Issue 5: SSL Certificate Issues
**Symptom**: SSL warnings or errors
**Solution**: Use Cloudflare Full (strict) mode
**Action Required**: ✅ Configure in Cloudflare

---

## ✅ Pre-Deployment Checklist

- [ ] Set `NEXT_PUBLIC_APP_URL` in Vercel
- [ ] Configure Cloudflare DNS (CNAME to Vercel)
- [ ] Enable Cloudflare proxy (orange cloud)
- [ ] Set Cloudflare SSL to Full (strict)
- [ ] Add domain in Vercel dashboard
- [ ] Update ImageKit CORS settings
- [ ] Test HTTPS connection
- [ ] Test authentication flow
- [ ] Test image uploads
- [ ] Test all API routes
- [ ] Verify cookie consent works
- [ ] Check mobile responsiveness
- [ ] Test admin panel access

---

## 📝 Notes

1. **No Code Changes Required**: The codebase is already configured to work with any domain/subdomain
2. **Environment Variables**: Only `NEXT_PUBLIC_APP_URL` needs to be updated
3. **ImageKit**: Only CORS settings need updating (dashboard configuration)
4. **Cloudflare**: Standard DNS and SSL configuration
5. **Vercel**: Standard domain addition process

---

## 🔍 Files to Review (No Changes Expected)

- `next.config.ts` - ✅ Already configured
- `lib/imagekit.ts` - ✅ No domain restrictions
- `contexts/AuthContext.tsx` - ✅ Uses localStorage
- `app/api/**` - ✅ All relative paths
- `components/CookieConsent.tsx` - ✅ Uses localStorage

---

## 🎯 Summary

**Total Issues Found**: 2
1. ✅ Environment variable update needed (`NEXT_PUBLIC_APP_URL`)
2. ✅ ImageKit CORS settings update needed

**Code Changes Required**: None
**Configuration Changes Required**: 2 (Vercel env var, ImageKit CORS)

The codebase is well-structured and should work seamlessly with the new subdomain after these two configuration updates.

