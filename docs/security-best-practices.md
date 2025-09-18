# Security Best Practices for GitHub Actions

## 🔐 Overview

Security is crucial when implementing CI/CD pipelines. This guide covers essential security practices for GitHub Actions workflows.

## 🔑 Secrets Management

### Use GitHub Secrets
```yaml
steps:
  - name: Deploy to production
    env:
      API_KEY: ${{ secrets.API_KEY }}
    run: deploy.sh
```

### Never hardcode sensitive data
❌ **Don't do this:**
```yaml
env:
  API_KEY: "sk-1234567890abcdef"
```

✅ **Do this:**
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

## 🛡️ Permissions

### Use minimal permissions
```yaml
permissions:
  contents: read
  pull-requests: write
```

### Avoid using `GITHUB_TOKEN` with write permissions unnecessarily

## 🏷️ Action Versions

### Pin to specific versions
✅ **Recommended:**
```yaml
- uses: actions/checkout@v4.1.1
```

❌ **Avoid:**
```yaml
- uses: actions/checkout@main
```

## 🔍 Input Validation

### Validate all inputs
```yaml
- name: Validate input
  run: |
    if [[ ! "${{ github.event.inputs.environment }}" =~ ^(dev|staging|prod)$ ]]; then
      echo "Invalid environment"
      exit 1
    fi
```

## 🌐 Environment Protection

### Use environment protection rules
- Require reviews for production deployments
- Restrict which branches can deploy to environments
- Use environment secrets for sensitive data

## 📝 Logging

### Avoid logging sensitive data
```yaml
- name: Debug (safe)
  run: |
    echo "Branch: ${{ github.ref_name }}"
    echo "Actor: ${{ github.actor }}"
    # Don't log secrets or sensitive environment variables
```

## ⚡ Quick Checklist

- [ ] All secrets stored in GitHub Secrets
- [ ] Actions pinned to specific versions
- [ ] Minimal permissions used
- [ ] Input validation implemented
- [ ] No hardcoded sensitive data
- [ ] Environment protection rules configured
- [ ] Logging doesn't expose sensitive data