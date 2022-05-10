# imi-standalone-toolbox-ui Change Log

Version numbers are semver-compatible dates in YYYY.MM.DD-X format,
where X is the revision number


# 2022.5.10

### Fixes
* **Provision:** Don't log when provision is starting and has succeeded, and
when provision fails mention Mario.


# 2022.5.3

### Features
* **Demo:** Add route to start the v2 retail journey demo on Google RCS.


# 2022.4.7

### Features
* **Demo:** Add route to start the v2 collections demo on SMS, Whatsapp, and
Google RCS.


# 2022.4.5

### Features
* **Demo:** Add route to start the v2 appointments demo on SMS, Whatsapp,
Apple Message for Business, and Google RCS.


# 2022.3.29-3

### Fixes
* **Provision:** Fix provision error message data format. Mark user as provision
complete if the error returned is "User Active" (because they are already
provisioned with that email address).


# 2022.3.29-2

### Fixes
* **Provision:** Fix saving provision error data to the user provision info.


# 2022.3.29-1

### Features
* **Provision:** Save provision error data to the user provision info.


# 2022.3.29

### Features
* **Provision:** Provision user using their provided email instead of using
an alias generated from their email address.


# 2022.1.12-1

### Fixes
* **Webex:** Fix join webex support space route.
* **Demo:** Update default inputs to match IMI demo site.


# 2022.1.12

### Features
* **Webex:** Add route to join webex support space.
* **Demo:** Add routes to start collections and appointments demos.


# 2021.11.17

### Features
* **Provision:** Add +dcloudimi tag to the email address of the provisioned user
account, for uniqueness across IMI tenants.


# 2021.11.16

### Features
* **Created:** Created.
