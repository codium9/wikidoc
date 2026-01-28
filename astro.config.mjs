import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config';
import starlightCatppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
  site: 'https://wiki.itdata.fr',
  integrations: [
    starlight({
			title: 'Wikidoc',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/codium9/wikidoc' }],
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "macchiato", accent: "sky" },
          light: { flavor: "latte", accent: "sky" }
        })
      ]
    })
  ]
})