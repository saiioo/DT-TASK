API Documentation for Nudge Creation



This is a Node.js and Express application with a MongoDB database. It allows users to create, read, update, and delete (CRUD) nudges. A nudge is an event reminder or invitation that can include a title, event name, description, icon, image, and send time.

The application uses the express package to create a server and handle HTTP requests. It also uses mongoose to connect to the MongoDB database and define a schema for the nudge collection. express-fileupload is used to handle file uploads of images for nudges.

The nudgeSchema defines the fields that make up a nudge and enforces some validation rules such as requiring certain fields to be present.

The app.post("/nudge", ...) route handles creating a new nudge. It creates a new Nudge instance from the request body and saves it to the database. If an image is uploaded with the nudge, it is saved to the server and the image path is added to the Nudge instance before saving.

The app.get("/nudge", ...) route retrieves all the nudges from the database and sends them back as a JSON response.

The app.get("/nudge/:id", ...) route retrieves a specific nudge by its id parameter and sends it back as a JSON response. If the id is not found, it sends a 404 error.

The app.put("/nudge/:id", ...) route updates an existing nudge with new data from the request body. If an image is uploaded, it is saved to the server and the image path is updated on the Nudge instance before saving.

The app.delete("/nudge/:id", ...) route deletes a nudge with the specified id parameter.

All routes handle errors and send appropriate error responses to the client.

The application listens on port 3000 and serves static images from the public/images directory.

Description:
This API enables users to create a nudge for an event. The nudge can be tagged with an event, given a title, an image, a time to send the nudge, and a description. It can also include an icon and a one-line invitation that will be shown where the nudge is minimized or when it is shown along with an event/article.

Base URL:
The base URL for the API is https://example.com/api/nudge-creation

API Endpoints:

Create a Nudge - POST /nudges
This endpoint creates a new nudge.

Request Payload:

event_id (string, required) - The ID of the event to tag the nudge with.
title (string, required) - The title of the nudge.
image (file, required) - The image to be shown as a cover for the nudge.
time_to_send (string, required) - The time at which the nudge should be sent.
description (string, required) - The description of the nudge.
icon (file, optional) - The icon to be shown along with the nudge.
one_line_invitation (string, optional) - The one-line invitation to be shown where the nudge is minimized or when it is shown along with an event/article.
Response Payload:

id (string) - The ID of the created nudge.
event_id (string) - The ID of the event tagged with the nudge.
title (string) - The title of the nudge.
image_url (string) - The URL of the image for the nudge.
time_to_send (string) - The time at which the nudge should be sent.
description (string) - The description of the nudge.
icon_url (string) - The URL of the icon for the nudge (if provided).
one_line_invitation (string) - The one-line invitation to be shown where the nudge is minimized or when it is shown along with an event/article (if provided).
Get a Nudge - GET /nudges/{id}
This endpoint retrieves a nudge by its ID.

Request Parameters:

id (string, required) - The ID of the nudge to retrieve.
Response Payload:

id (string) - The ID of the nudge.
event_id (string) - The ID of the event tagged with the nudge.
title (string) - The title of the nudge.
image_url (string) - The URL of the image for the nudge.
time_to_send (string) - The time at which the nudge should be sent.
description (string) - The description of the nudge.
icon_url (string) - The URL of the icon for the nudge (if provided).
one_line_invitation (string) - The one-line invitation to be shown where the nudge is minimized or when it is shown along with an event/article (if provided).
Update a Nudge - PUT /nudges/{id}
This endpoint updates an existing nudge.

Request Parameters:

id (string, required) - The ID of the nudge to update.
Request Payload:

event_id (string, optional) - The ID of the event to tag the nudge with.
title (string, optional) - The title of the nudge.
image (file, optional) - The image to be shown as a cover for the nudge
time_to_send (string, optional) - The time at which the nudge should be sent.
description (string, optional) - The description of the nudge.
icon (file, optional) - The icon to be shown along with the nudge.
one_line_invitation (string, optional) - The one-line invitation to be shown where the nudge is minimized or when it is shown along with an event/article.
Response Payload:

id (string) - The ID of the updated nudge.
event_id (string) - The ID of the event tagged with the nudge.
title (string) - The title of the nudge.
image_url (string) - The URL of the image for the nudge (if updated).
time_to_send (string) - The time at which the nudge should be sent (if updated).
description (string) - The description of the nudge (if updated).
icon_url (string) - The URL of the icon for the nudge (if updated).
one_line_invitation (string) - The one-line invitation to be shown where the nudge is minimized or when it is shown along with an event/article (if updated).

Delete a Nudge - DELETE /nudges/{id}
This endpoint deletes a nudge by its ID.

Request Parameters:

id (string, required) - The ID of the nudge to delete.
Response Payload:

status (string) - The status of the deletion request.

Examples:

Creating a Nudge:

POST /nudges
Request Payload:
{
"event_id": "1234",
"title": "Reminder for the event",
"image": "<binary_data>",
"time_to_send": "2023-05-01T08:00:00",
"description": "Don't forget about the upcoming event!",
"icon": "<binary_data>",
"one_line_invitation": "Join us for a great time!"
}
Response Payload:
{
"id": "5678",
"event_id": "1234",
"title": "Reminder for the event",
"image_url": "https://example.com/nudge-image.jpg",
"time_to_send": "2023-05-01T08:00:00",
"description": "Don't forget about the upcoming event!",
"icon_url": "https://example.com/nudge-icon.jpg",
"one_line_invitation": "Join us for a great time!"
}

Retrieving a Nudge:

GET /nudges/5678
Response Payload:
{
"id": "5678",
"event_id": "1234",
"title": "Reminder for the event",
"image_url": "https://example.com/nudge-image.jpg",
"time_to_send": "2023-05-01T08:00:00",
"description": "Don't forget about the upcoming event!",
"icon_url": "https://example.com/nudge-icon.jpg",
"one_line_invitation": "Join us for a great time!"
}

Updating a Nudge:

PUT /nudges/5678
Request Payload:
{
"event_id": "5678",
"title": "Reminder for the updated event",
"image": "<binary_data>",
"time_to_send": "2023-05-02T08:00:00",
"description": "Don't forget about the updated event!",
"icon": "<binary_data>",
"one_line_invitation": "Join us for an even better time!"
}
Response Payload:
{
"id": "5678",
"event_id": "5678",
"title": "Reminder for the updatedevent",
"image_url": "https://example.com/updated-nudge-image.jpg",
"time_to_send": "2023-05-02T08:00:00",
"description": "Don't forget about the updated event!",
"icon_url": "https://example.com/updated-nudge-icon.jpg",
"one_line_invitation": "Join us for an even better time!"
}

Deleting a Nudge:

DELETE /nudges/5678
Response Payload:
{
"status": "success"
}







POST /nudges
Request Payload:
{
    "event_id": "1234",
    "title": "Reminder for the event",
    "image": "<binary_data>",
    "time_to_send": "2023-05-01T08:00:00",
    "description": "Don't forget about the upcoming event!",
    "icon": "<binary_data>",
    "one_line_invitation": "Join us for a great time!"
}
Response Payload:
{
    "id": "5678",
    "event_id": "1234",
    "title": "Reminder for the event",
    "image_url": "https://example.com/nudge-image.jpg",
    "time_to_send": "2023-05-01T08:00:00",
    "description": "Don't forget about the upcoming event!",
    "icon_url": "https://example.com/nudge-icon.jpg",
    "one_line_invitation": "Join us for a great time!"
}





GET /nudges/{id}
Response Payload:
{
    "id": "5678",
    "event_id": "1234",
    "title": "Reminder for the event",
    "image_url": "https://example.com/nudge-image.jpg",
    "time_to_send": "2023-05-01T08:00:00",
    "description": "Don't forget about the upcoming event!",
    "icon_url": "https://example.com/nudge-icon.jpg",
    "one_line_invitation": "Join us for a great time!"
}







PUT /nudges/{id}
Request Payload:
{
    "event_id": "5678",
    "title": "Reminder for the updated event",
    "image": "<binary_data>",
    "time_to_send": "2023-05-02T08:00:00",
    "description": "Don't forget about the updated event!",
    "icon": "<binary_data>",
    "one_line_invitation": "Join us for an even better time!"
}
Response Payload:
{
    "id": "5678",
    "event_id": "5678",
    "title": "Reminder for the updated event",
    "image_url": "https://example.com/nudge-image.jpg",
    "time_to_send": "2023-05-02T08:00:00",
    "description": "Don't forget about the updated event!",
    "icon_url": "https://example.com/nudge-icon.jpg",
    "one_line_invitation": "Join us for an even better time!"
}






DELETE /nudges/{id}
Response Payload:
{
    "status": "success"
}
