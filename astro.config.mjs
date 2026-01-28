//// @ts-check
//import { defineConfig } from 'astro/config';
//import starlight from '@astrojs/starlight';
//
//// https://astro.build/config
//export default defineConfig({
//	integrations: [
//		starlight({
//			title: 'Wikidoc',
//			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
//			sidebar: [
//				{
//					label: 'Guides',
//					items: [
//						// Each item here is one entry in the navigation menu.
//						{ label: 'Example Guide', slug: 'guides/example' },
//					],
//				},
//				{
//					label: 'Reference',
//					autogenerate: { directory: 'reference' },
//				},
//			],
//		}),
//	],
//});

// @ts-check
import catppuccin from "@catppuccin/starlight";

export default defineConfig({
  site: 'https://codium9.github.io',
	base: '/wikidoc',
})

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
			title: 'Wikidoc',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/codium9/wikidoc' }],
      plugins: [
        catppuccin({
          dark: { flavor: "macchiato", accent: "sky" },
          light: { flavor: "latte", accent: "sky" }
        })
      ]
    })
  ]
})
