# 100x Microblogging (twitter) platform Schema Design

> Module 10 - Assignment 1: Schema Design for 100x Microblogging Platform
> by Vijayabaskar
> Debian House

### entities

- User
- Post
- Followings

### Relationship

- post belongs to user (one-to-many)
- user can have many followers and follow many users (many-to-many)
- comments belongs to post (one-to-many)

### Schema

#### User

Description : Main entity of the app,

- we chose auto-increment id for our tables
- enforcing unique constrante on the username and email, a user should have unique user_name and only one account for one email

```
 * User Table
 *
 * id (primary_key): auto-int BigInt
 * username (15 character): unique, string
 * email: unique, string
 * password varchar(128): hashed
 * display_name (50 character): string
 * bio (260 character): text
 * dateofBirth (date - above 13 years) :
 * website: string
 * location: string
 * profilePicUrl : url defalut null
 * headerPicUrl : url default null
 * emailVerified_at: timestamp
 * authToken varchar(256) : default null verify length
 * authSession varchar(256) : default null  verify length
 * authSession_expiry : timestamp  default null
```

#### Post

- similar to user main entity of the app,
- difference between text & string : - strings have length limitation and text doesnot, string consume less storeage and text consume more storeagte that string
- string is user for one or two worlds and text is used for paragraphs text (collections of strings)
- enfourcing one-to-many relation through foreign-keys

```
 * Post Table
 *
 * id (primary key): BigInt, serial
 * content (280 character): text
 * postedAt: timestamps
 * repostId (foreign-key): BigInt null
 * updatedAt : timestamp
 * userId (foreign-key): BigInt
 * likeCount (foreign-key) : BigInt
  * reply_to_id (foreign-key): BigInt // field for reply feature
 * replied_at: timestamp // new field for reply timing
```

#### Following

- with unique constraint the enforce the rule of user can not follow themselves
- this table can be user for both follower's and following

```
 * FollowActionor your
 *
 * id (primary key): serials, BigInt
 * userId (foreign-key) : BigInt unique
 * followedId (foreign-key) : BigInt unique
 * followerdById : BigInt unique
 * followedAt : timestamp,
```

#### likes

- liked-by unique constrant enforce the rule of one user can like only once

```
 * likes table
 *
 * id (primary key): serial BigInt
 * post_id (foreign-key) : BigInt
 * likedBy (user_id, foreign-key) : BigInt unique
 * likedAt : timestamp
```

<!-- #### Comments

- parent_command_id is referenceing the reply table itself to make the thread like conversatins
- post_id is unique to ensure that comments always belong to the post only and not the other commands -->

<!-- ```
 * reply Table
 *
 * id (primary key): BigInt, serial
 * post_id (foreign_key): BigInt unique
 * user_Id (foreign-key): BigInt
 * replyText : text
 * replyAt : timestamp
 * parentCommand_id (foreign-key): BigInt Null
``` -->

### Generation migration cmd

```
User

npx sequelize-cli model:generate --name User --attributes userName:String, email:String, emailVerifiedAt:Date, displayName:String, bio TEXT,
password:String, website:String, location:String,

Post

npx sequelize-cli model:generate --name Post --attributes postText: Text, postedAt: Date, userId: BigInt, repostId: BigInt, like: BigInt,

FollowAction

npx sequelize-cli model:generate --name FollowAction --attributes followedAt:Date,userId:BigInt,followedId:BigInt

Like

npx sequelize-cli model:generate --name Likes --attributes post_id:BigInt,likedBy:BigInt,likedAt:Date

Comments

npx sequelize-cli model:generate --name Comments --attributes postId:BigInt,userId:BigInt,content:Text,commentedAt:Date,parentCommentId:BigInt

```
