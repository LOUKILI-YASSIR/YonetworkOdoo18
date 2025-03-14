{
    'name': "YONETWORK Theme",
    'version': '1.0',
    'summary': "YONETWORK theme pour Odoo 18",
    'author': "LOUKILI YASSIR",
    'category': "Theme",
    'depends': ['web', "website"],
    'images': ['YONETWORK_THEME/static/src/img/logo.png'],
    'assets': {
        'web.assets_backend': [
            'YONETWORK_THEME/static/src/css/style.css',
        ],
    },
    'installable': True,
    'application': False,
}