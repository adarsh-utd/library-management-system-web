
## Overview

Frontend is developed using simple bootstrap, html , css and javascript.

## Login and Signup

#### Signup Flow
**Purpose**: Allows users to create an account with the system.
The user can fill out the form and choose their user type (librarian or member). The form consist of username , password, email, address and user type. If successful, a confirmation message is shown, and the user is redirected to the login page. If unsuccessful , an alert message is shown

#### Login Flow
**Purpose**: Allows users to authenticate and access the system.
The user can fill out the form that consist of username and password. If successful , access token and user type will be stored in local storage and redirected to dashboard. If unsuccessful , an alert message is shown.

## Dashboard

#### Member dashboard
**Purpose**: Allows users to view books ,borrow/return books and delete their own accounts.

**Flow**

1. User is authenticated and redirected to the  Dashboard.
2. Users can view books .
3. Users can track books history when it is borrowed , who borrowed it and when it is returned.
4. Users can borrow available books and return its appropriately.

#### Librarian Dashboard
**Purpose**: Allows users to view books , add books , update and delete.

**Flow**

1. User is authenticated and redirected to the  Dashboard.
2. Users can view books .
3. User can add/update books.
4. Users can delete books.

## Member management section
**Purpose**: Allows librarian to view members ,add/update , delete members and history of members .

**Flow**

1. User is authenticated and redirected to the  Dashboard.
2. Librarian can go to member management section by clicking members in navigation bar.
3. Users can view members both active and deleted .
4. User can add/update members.
5. Users can delete members.
