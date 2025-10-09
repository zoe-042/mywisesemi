# Manual Badge Management - Read-Only System

This system allows you to control which content items display "NEW" badges by editing a simple JSON file on the server.

## How It Works

1. **Enable Manual Mode**: In the Admin Panel → Content Management tab, turn on "Manual Badge Control"

2. **Edit the JSON File**: Edit `/public/data/manual-badges.json` directly on your server

3. **Automatic Updates**: The system checks the file every 30 seconds and updates all user browsers automatically

## JSON File Format

```json
{
  "version": 1,
  "lastUpdated": "2025-10-09T12:00:00Z",
  "badges": {
    "content-id-1": true,
    "content-id-2": false,
    "announcement-1": true,
    "event-5": true,
    "department-hr": false
  }
}
```

### Fields Explained

- **version**: File format version (always 1 for now)
- **lastUpdated**: ISO 8601 timestamp of when you last edited (for reference only)
- **badges**: Object mapping content IDs to boolean values
  - `true` = Show "NEW" badge
  - `false` = Don't show "NEW" badge
  - Omitted IDs = Don't show "NEW" badge

## Finding Content IDs

You can find content IDs in the Admin Panel → Content Management tab. Each item shows its ID like:

```
ID: announcement-3 • Updated: 2025-01-15 • Author: Admin
```

Common ID patterns:
- Announcements: `announcement-1`, `announcement-2`, etc.
- Events: `event-1`, `event-2`, etc.
- Departments: `department-hr`, `department-rd1`, etc.
- Documents: `employee-handbook`, `brand-guidelines`, etc.
- Life content: `company-dining`, `team-building`, etc.

## Example Use Cases

### Mark a new announcement as NEW
```json
{
  "badges": {
    "announcement-5": true
  }
}
```

### Mark multiple items as NEW
```json
{
  "badges": {
    "announcement-5": true,
    "event-3": true,
    "department-marketing": true
  }
}
```

### Remove all NEW badges
```json
{
  "badges": {}
}
```

## Important Notes

⚠️ **JSON Syntax**: Make sure your JSON is valid. Use a JSON validator if needed.

⚠️ **File Permissions**: The file must be readable by your web server.

⚠️ **No Restart Required**: Changes are picked up automatically within 30 seconds.

⚠️ **All Users See Changes**: Once you edit the file, all users on all computers will see the updated badges.

✅ **Backup Recommended**: Keep a backup of your badge settings before making changes.

## Troubleshooting

**Badges not showing?**
- Check that Manual Mode is enabled in Admin Panel
- Verify JSON syntax is valid
- Check browser console for errors
- Wait 30 seconds for the cache to refresh

**Changes not appearing?**
- Wait up to 30 seconds for automatic refresh
- Check file was saved correctly on server
- Verify content ID spelling matches exactly
