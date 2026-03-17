# Production Deployment Notes

## Configuration

### Next.js Config
- **Image Optimization**: Disabled (`unoptimized: true`) - suitable for static export
- **TypeScript**: Build errors will fail the build (production safety)
- **ESLint**: Linting errors will fail the build (code quality)

### Environment Variables
Currently, no environment variables are required. If you need to add any:
1. Add them to `.env.example` for documentation
2. Configure them in Vercel project settings
3. Use `NEXT_PUBLIC_` prefix for client-side variables

## Known Considerations

### Hardcoded Event ID
The main page uses a hardcoded event ID: `evt_01ABC`

**Location**: `app/page.tsx`

**Options**:
- Keep as demo/default value
- Make dynamic via URL parameter: `/events/[eventId]`
- Configure via environment variable: `NEXT_PUBLIC_DEFAULT_EVENT_ID`

### Server-Sent Events (SSE)
The workflow canvas connects to `/events/${eventId}/stream` for real-time updates.

**Requirements**:
- Ensure SSE endpoint is available in production
- Configure CORS if API is on different domain
- Consider connection retry logic for network failures

### Mobile Support
The application intentionally blocks mobile devices with a friendly message. This is by design for the workflow visualization interface.

## Error Handling

### Error Boundary
Added `app/error.tsx` to catch and display runtime errors gracefully.

**Production TODO**: Integrate error tracking service (Sentry, LogRocket, etc.)

### SSE Error Handling
SSE parsing errors are silently ignored to prevent console noise. Consider logging to external service if debugging is needed.

## Accessibility
The application includes comprehensive accessibility features:
- ARIA labels on interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

## Performance

### Bundle Size
Monitor bundle size with:
\`\`\`bash
npm run build
\`\`\`

### Loading States
Consider adding loading states for:
- Initial SSE connection
- Node status updates
- Code generation

## Security

### Content Security Policy
Consider adding CSP headers in production for enhanced security.

### API Authentication
If the SSE endpoint requires authentication, ensure tokens are properly managed and refreshed.

## Monitoring

### Analytics
Vercel Analytics is integrated via `@vercel/analytics/next`.

### Recommended Additions
- Error tracking (Sentry)
- Performance monitoring (Vercel Speed Insights)
- User session recording (optional)

## Pre-Deployment Checklist

- [x] Remove development console.logs
- [x] Enable TypeScript strict checking
- [x] Enable ESLint in build
- [x] Add error boundary
- [x] Verify metadata and SEO
- [x] Test mobile fallback
- [x] Verify accessibility features
- [ ] Test SSE connection in production environment
- [ ] Configure error tracking service
- [ ] Set up monitoring dashboards
- [ ] Load test with expected traffic
- [ ] Verify CORS configuration for SSE endpoint
