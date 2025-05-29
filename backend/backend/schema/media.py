from marshmallow import Schema, fields, validate

class MediaSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(
        required=True,
        validate=validate.Length(min=1, max=255),
        error_messages={"required": "Judul media wajib diisi."}
    )
    year = fields.Integer(
        required=True,
        validate=validate.Range(min=1888, max=2100), # First film created in 1888, setting a reasonable upper bound
        error_messages={"required": "Tahun rilis wajib diisi."}
    )
    type = fields.String(
        required=True,
        validate=validate.OneOf(["Movie", "Series", "Anime", "Documentary"]),
        error_messages={"required": "Tipe media wajib diisi."}
    )
    director = fields.String(
        validate=validate.Length(max=255)
    )
    genre = fields.String(
        validate=validate.Length(max=255) # Comma-separated genres
    )
    status = fields.String(
        required=True,
        validate=validate.OneOf(["Planned", "Watching", "Completed"]),
        error_messages={"required": "Status media wajib diisi."}
    )
    rating = fields.Float(
        validate=validate.Range(min=1.0, max=5.0)
    )
    synopsis = fields.String()
    notes = fields.String()
    poster = fields.URL(
        validate=validate.Length(max=512)
    )

class MediaCreateSchema(Schema):
    title = fields.String(
        required=True,
        validate=validate.Length(min=1, max=255),
        error_messages={
            "required": "Judul media wajib diisi.",
            "min": "Judul minimal 1 karakter.",
            "max": "Judul maksimal 255 karakter."
        }
    )
    year = fields.Integer(
        required=True,
        validate=validate.Range(min=1888, max=2100),
        error_messages={
            "required": "Tahun rilis wajib diisi.",
            "min": "Tahun rilis tidak valid.",
            "max": "Tahun rilis tidak valid."
        }
    )
    type = fields.String(
        required=True,
        validate=validate.OneOf(["Movie", "Series", "Anime", "Documentary"]),
        error_messages={"required": "Tipe media wajib diisi."}
    )
    director = fields.String(
        validate=validate.Length(max=255)
    )
    genre = fields.String(
        validate=validate.Length(max=255)
    )
    status = fields.String(
        required=True,
        validate=validate.OneOf(["Planned", "Watching", "Completed"]),
        error_messages={"required": "Status media wajib diisi."}
    )
    rating = fields.Integer(
        validate=validate.Range(min=1, max=5)
    )
    synopsis = fields.String()
    notes = fields.String()
    poster = fields.URL(
        validate=validate.Length(max=512)
    )

class MediaUpdateSchema(Schema):
    """Schema for updating media (only mutable fields)"""
    title = fields.String(
        validate=validate.Length(min=1, max=255)
    )
    year = fields.Integer(
        validate=validate.Range(min=1888, max=2100)
    )
    type = fields.String(
        validate=validate.OneOf(["Movie", "Series", "Anime", "Documentary"])
    )
    director = fields.String(
        validate=validate.Length(max=255)
    )
    genre = fields.String(
        validate=validate.Length(max=255)
    )
    status = fields.String(
        validate=validate.OneOf(["Planned", "Watching", "Completed"])
    )
    rating = fields.Float(
        validate=validate.Range(min=1.0, max=5.0)
    )
    synopsis = fields.String()
    notes = fields.String()
    poster = fields.URL(
        validate=validate.Length(max=512)
    )