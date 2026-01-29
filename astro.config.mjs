import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config';
import starlightCatppuccin from "@catppuccin/starlight";
import remarkEmoji from 'remark-emoji';
import markdoc from '@astrojs/markdoc';


// https://astro.build/config
export default defineConfig({
  site: 'https://wiki.itdata.fr',
  markdown: {
    remarkPlugins: [remarkEmoji],
    shikiConfig: {
      wrap: true
    }
  },
  vite: {
    plugins: [
      {
        name: 'inject-components',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.mdx')) {
            return `import { Aside, Badge } from '@astrojs/starlight/components';\n${code}`;
          }
        }
      }
    ]
  },
  integrations: [
    markdoc(),
    starlight({
			title: 'Wikidoc',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/codium9/wikidoc' }],
      sidebar: [
        { label: 'Backup', autogenerate: { directory: 'Backup' } },
        { label: 'Code', autogenerate: { directory: 'Code' } },
        { label: 'Database', autogenerate: { directory: 'Database' } },
        { label: 'Docker', autogenerate: { directory: 'Docker' } },
        { label: 'Git', autogenerate: { directory: 'Git' } },
        { label: 'Linux', autogenerate: { directory: 'Linux' } },
        { label: 'Microsoft', autogenerate: { directory: 'Microsoft' } },
        { label: 'Middleware', autogenerate: { directory: 'Middleware' } },
        { label: 'Security', autogenerate: { directory: 'Security' } },
        { label: 'Terraform', autogenerate: { directory: 'Terraform' } },
        { label: 'Unix', autogenerate: { directory: 'Unix' } }
      ],
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "macchiato", accent: "mauve" },
          light: { flavor: "latte", accent: "mauve" }
        })
      ]
    })
  ]
})