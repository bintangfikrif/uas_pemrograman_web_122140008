def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # Media API routes (match views/media.py)
    config.add_route('api_v1.media_collection', '/api/media')
    config.add_route('api_v1.media_entry', '/api/media/{id:\d+}')

    # User authentication routes (if implemented)
    config.add_route('api_v1.users', '/api/v1/users')
    config.add_route('api_v1.user', '/api/v1/users/{id}')
    config.add_route('api_v1.login', '/api/v1/login')
    config.add_route('api_v1.register', '/api/v1/register')
    config.add_route('api_v1.logout', '/api/v1/logout')