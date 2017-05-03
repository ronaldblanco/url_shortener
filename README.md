Created by Ronald Blanco.

mailto:pnald.blanco@gmail.com
https://github.com/ronaldblanco
https://www.linkedin.com/in/ronald-blanco-carrazana-5b506268/
http://codepen.io/ronaldblanco/#
https://www.freecodecamp.com/ronaldblanco

URL Shortener

User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
User Story: When I visit that shortened URL, it will redirect me to my original link.

Example creation usage:
    https://.../new/https://www.google.com
    https://.../new/http://foo.com:80
    Example creation output:
    {
        "shortened_URL": "http://.../FyP"
    }
    Usage:
        <https://.../FyP</code>
        Will redirect to:
        https://www.google.com/
    Other Options:
        To Check if a URL or Short ID are in the database:
        https://.../checkurl/https://www.google.com
        https://.../checkshort/FyP