

# Mello - E2E, pixel perfect application for project management inspired by Trello. (React + Node.js)

A project management and team collaboration app, inspired by trello. [Check it our here](https://mello-by-bar-noam.herokuapp.com/).
For those of you who are hearing about Trello for the first time, you can read about it [here](#about-trello).
If you are familiar with everything Trello can do, scroll to our [Showcase](#showcase) of Mello.

![mellopreview](https://res.cloudinary.com/debmbjvbh/image/upload/v1661780313/board_wo77dx.png)

### About Trello

Trello is a project management app, using Kanban-style boards,allowing you to optimize work delivery across multiple teams and handle even the most complex projects in a single environment.
Each board is composed of lists which contain different tasks. Users can modify the board, move tasks and lists across the board with D&D, label tasks, add attachments, set deadlines and more. Members of the board can witness every change made live. Everything you see in Trello, you will certainly see in Mello! 

### Features

* Create boards, create and move lists and tasks across the board using **D&D. 
* Edit task to the deepest level: cover(color/image), labels, attachments, due dates, description, members, checklists. filter members and labels. copy and remove tasks and lists.
* Activity log, background cover for the board. (on side-menu).
* Login authentication, including encrypting user information.

### Technologies

The technnology stack we used is MERN - MongoDB, Express, React, Node.js.
We used webSockets to enable real-time updates for all users. API calls to the backend are done with REST API method.
In addition, we have incorporated third-side libraries, such as React beautiful D&D, Date-picker and more.
the App's layout was made with Sass (functions, mixins, variables).


### Showcase

#### Homepage

The landing page, in which the user can get some information about Mello, sign up/ login or press the call to action button "Start doing" to start as a guest.

![homepage](https://res.cloudinary.com/debmbjvbh/image/upload/v1661780014/homepage_qddzgw.png)

#### Workspace

User's Workspace, containing all his boards, including his starred boards. In addition, the user can create a new board (by choosing a title and a background color/ image) or start with one of our suggested templates.

![workspace](https://res.cloudinary.com/debmbjvbh/image/upload/v1661780269/boards_fgekdi.png)

Our Kanban-style board, containing all of the functionality Trello has. Add lists, tasks, move them across the board with D&D.Editing tasks to the deepest level. Add members to the board and to a specific task and much more! [Check it out for yourself](https://mello-by-bar-noam.herokuapp.com/)

![board](https://res.cloudinary.com/debmbjvbh/image/upload/v1661780313/board_wo77dx.png)

#### Task details

When clicking a task, task details is opened and the user can edit the task, label it, add attachments, description, checklists and more. Every button on the right menu opens a dynamic modal, enabling a different action. All changes are being seen live, both in this page and the board's.  

![taskdetails](https://res.cloudinary.com/debmbjvbh/image/upload/v1661780373/taskdetails1_lrv3xz.png)

#### Side menu

The side menu on the right (opened by clicking "Show menu" button) displays the activity log of the board, documenting the time and action made by each member of the board. Moreover, users can change the background of the board by choosing from our selection of background images or upload directly from their computer. 

![sidemenu](https://res.cloudinary.com/debmbjvbh/image/upload/v1661780463/sidemenu_iokicl.png)

#### Signup

We have created an e2e authentication flow, in which we are encrypting user's information.

![signup](https://res.cloudinary.com/debmbjvbh/image/upload/v1661780512/signup_s7zdzp.png)

#### And on Mobile!

A taste of the mobile experience. we have used mixins, rem and em units, aspect ratio and  more, to make our website responsive with minimun effort.

<div style="display:flex">
<img src="https://user-images.githubusercontent.com/102179997/187438857-af245de8-dd0a-4fcf-bcac-ee95151f7c69.png" alt="signup-mobile" width="19%"   />
<img src="https://user-images.githubusercontent.com/102179997/187438916-5d56bc56-ea64-4c7f-9975-7bae3066b887.png" alt="board-mobile" width="19%" />
<img src="https://user-images.githubusercontent.com/102179997/187438997-c397a104-1e40-459e-8902-eae8ebc59799.png" alt="workspace-mobile" width="19%" />
<img src="https://user-images.githubusercontent.com/102179997/187439069-5c40f5bc-0aba-43a2-9180-519f0264d40d.png" alt="taskdetails-mobile" width="19%" />
<img src="https://user-images.githubusercontent.com/102179997/187439098-eae1e817-f571-4e0b-9528-152c076c9016.png" alt="sidemenu-details-mobile" width="19%" />
</div>

#### Authors

* Bar Ivri
* Noam Bar
* Itamar Sahar





