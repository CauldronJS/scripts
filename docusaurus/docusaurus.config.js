module.exports = {
  title: 'CauldronJS',
  tagline: 'Making plugin development easier.',
  url: 'https://cauldronjs.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'CauldronJS', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'CauldronJS',
      logo: {
        alt: 'CauldronJS',
        src: 'img/logo.svg'
      },
      links: [
        { to: 'docs/introduction', label: 'Docs', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/CauldronJS',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/design-principles'
            },
            {
              label: 'Installation',
              to: 'docs/installation'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/cauldronjs'
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/E9ntVnn'
            }
          ]
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/CauldronJS'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/CauldronJS'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Justin Cox - Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/CauldronJS/scripts/edit/master/docusaurus/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
