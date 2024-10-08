# Book Tracker

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Book Tracker is a web application designed to help users keep track of the books they read. It allows users to add, edit, and delete book records, including details such as the book's title, author, rating, review, and date completed. The application also features an admin panel for managing reviews and a user-friendly interface for exploring and managing book entries.

## Features

- **Book Listings:** View a list of all books in your collection with details like title, author, rating, and completion date.
- **Book Details:** View detailed information about each book, including a cover image, review, and date completed.
- **Admin Panel:** Secure login for administrators to manage book entries, including adding, editing, and deleting reviews.
- **Responsive Design:** Built with Bootstrap for a responsive and user-friendly experience on all devices.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Frontend:** EJS, Bootstrap
- **Environment:** dotenv for managing environment variables

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/vardanskamra/book-notes
   cd book-notes
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Postgres Table:**

    ```sql
    -- Table: public.library

    -- DROP TABLE IF EXISTS public.library;

    CREATE TABLE IF NOT EXISTS public.library(
        id integer NOT NULL DEFAULT nextval('library_id_seq'::regclass),
         title character varying(255) COLLATE pg_catalog."default" NOT NULL,
        author character varying(255) COLLATE pg_catalog."default",
        rating integer,
        review text COLLATE pg_catalog."default",
        date_read date,
        isbn character varying(13) COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT library_pkey PRIMARY KEY (id),
        CONSTRAINT library_isbn_key UNIQUE (isbn),
        CONSTRAINT library_rating_check CHECK (rating >= 1 AND rating <= 5)
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.library
        OWNER to postgres;
    ```

4. **Set Up Environment Variables:**

    Create a .env file in the root directory with the following variables:

    ```bash
    DB_USER=your_db_user
    DB_HOST=localhost
    DB_NAME=book_tracker
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    ADMIN_USERNAME=your_admin_username
    ADMIN_PASSWORD=your_admin_password
    ```

5. **Start the Application:**

    ```bash
    npm start
    ```

    The application will be running on http://localhost:3000.

## Usage
- Home Page: View a list of books and their details.
![Home Page](images/home_page.png)
- Admin Login: Access the admin panel to manage book entries.
![Admin Login](images/admin_login.png)
- Book Details Page: View detailed information and reviews of a specific book.
![Book Page](images/book_page.png)
- Add/Edit Book: Use the forms to add or edit book information.
![Add Review](images/add_review.png)

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.