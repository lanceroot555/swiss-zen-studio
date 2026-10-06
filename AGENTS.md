<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all public-facing Dimaloka copy, contact details, pricing placeholders, and analytics IDs in one site configuration module so future content updates stay centralized.
- Submit consultation requests through a validated TanStack server function so browser input never directly controls email delivery.

- Keep editorial spacing in the shared site-section utility and apply font/color roles through global semantic tokens; this preserves consistent hierarchy across content pages.

- Use bundled illustrative website imagery with explicit sample captions rather than fabricated portfolio metrics; this keeps agency visuals honest while real case studies are unavailable.

- Share the site header, footer, and cart provider in the root layout so all content pages maintain one navigation and shopping state.
- Resolve guest order catalog values in a validated server function and persist private order snapshots with rate limiting; this prevents client-controlled pricing or public order reads.
- Store the guest cart locally and synchronize browser tabs, while keeping the last confirmation session-scoped to avoid requiring accounts.
- Editable page copy lives as defaults in site-config; database overrides (site_content) are deep-merged onto those objects by applyContent in the root loader and before order pricing, so pages keep importing config while admins edit content.
- Dashboard roles live in a separate user_roles table (administrator, editor) checked through has_role/is_staff in RLS; user management runs in admin-verified server functions because it needs privileged auth APIs.
- Blog posts are stored as Markdown and read publicly only through published-filtered server functions so drafts never reach visitors.
- Navigation is stored as editable menu objects and shared by header and footer; map approved destinations to typed router links to keep navigation functional.
- Service landing pages use a shared dynamic route with centralized per-service content; this keeps six service pages independently editable with a consistent conversion structure.
- Page JSON-LD lives in editable page settings and article JSON-LD in blog_posts; parse and escape data before rendering and replace default schema when custom schema exists to prevent executable scripts and duplicate entities.
