from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPNoContent
)
from ..models.media import Media # Assuming your Media model is in ..models/media.py
from ..services.media import MediaService # Assuming your MediaService is in ..services/media.py
from ..schema.media import (
    MediaSchema,
    MediaCreateSchema,
    MediaUpdateSchema
)

from marshmallow.exceptions import ValidationError

@view_config(route_name='api_v1.media_collection', request_method='GET', renderer='json')
def get_media_collection(request):
    """Get all media entries."""
    media_items = MediaService.get_all_media(request.dbsession)
    return MediaSchema(many=True).dump(media_items)

@view_config(route_name='api_v1.media_collection', request_method='POST', renderer='json')
def create_media_entry(request):
    """Create a new media entry."""
    try:
        media_data = MediaCreateSchema().load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    # Optional: Check for duplicate media based on title and year
    if MediaService.get_media_by_title_and_year(request.dbsession, media_data['title'], media_data['year']):
        raise HTTPBadRequest(json={'errors': {'title': ['Media with this title and year already exists.']}})

    media_entry = MediaService.create_media(request.dbsession, media_data)
    return MediaSchema().dump(media_entry)

@view_config(route_name='api_v1.media_entry', request_method='GET', renderer='json')
def get_media_entry(request):
    """Get a media entry by ID."""
    media_id = int(request.matchdict['id'])
    media_entry = MediaService.get_media_by_id(request.dbsession, media_id)

    if not media_entry:
        raise HTTPNotFound()

    return MediaSchema().dump(media_entry)

@view_config(route_name='api_v1.media_entry', request_method='PUT', renderer='json')
def update_media_entry(request):
    media_id = int(request.matchdict['id'])
    media_entry = MediaService.get_media_by_id(request.dbsession, media_id)

    if not media_entry:
        raise HTTPNotFound()

    try:
        data = dict(request.json_body)
        data.pop('id', None)  # Remove 'id' if it exists in the input
        update_data = MediaUpdateSchema().load(data, partial=True)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    updated_media_entry = MediaService.update_media(request.dbsession, media_entry, update_data)
    return MediaSchema().dump(updated_media_entry)


@view_config(route_name='api_v1.media_entry', request_method='DELETE')
def delete_media_entry(request):
    """Delete a media entry."""
    media_id = int(request.matchdict['id'])
    media_entry = MediaService.get_media_by_id(request.dbsession, media_id)

    if not media_entry:
        raise HTTPNotFound()

    MediaService.delete_media(request.dbsession, media_entry)
    return HTTPNoContent()