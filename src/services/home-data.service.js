import boardTeaser from '../assets/img/boradTeaser.svg'
import cardTeaser from '../assets/img/cardTeaser.svg'
import autoTeaser from '../assets/img/autoTeaser.webp'
import powerUpsTeaser from '../assets/img/powerUpsTeaser.webp'


export const teasersInfo=[
    {
        title:'Features to help your team succeed',
        text:'Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to events and goal setting, Trello’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.'
    },
    {
        miniTitle:'CHOOSE A VIEW',
        title:'The board is just the beginning',
        text:'Lists and cards are the building blocks of organizing work on a Mello board. Grow from there with task assignments, timelines, productivity metrics, calendars, and more.',
        img:{
            src:boardTeaser,
            title:'boardTeaser'
        }
    },
    {
        miniTitle:'DIVE INTO THE DETAILS',
        title:'Cards contain everything you need',
        text:'Mello cards are your portal to more organized work—where every single part of your task can be managed, tracked, and shared with teammates. Open any card to uncover an ecosystem of checklists, due dates, attachments, conversations, and more.',
        img:{
            src:cardTeaser,
            title:'cardTeaser'
        }
    },
    {
        miniTitle:'MEET YOUR NEW BUTLER',
        title:'No-code automation',
        text:'Let the robots do the work—so your team can focus on work that matters. With Trello’s built-in automation, Butler, reduce the number of tedious tasks (and clicks) on your project board by harnessing the power of automation across your entire team.',
         img:{
            src:autoTeaser,
            title:'autoTeaser'
        }

    },
    {
        miniTitle:'POWER-UPS',
        title:'Integrate top work tools',
        text:'Easily connect the apps your team already uses into your Mello workflow, or add a Power-Up that helps fine-tune one specific need. With hundreds of Power-Ups available, your team’s workflow wishes are covered.',
        img:{
            src:powerUpsTeaser,
            title:'powerUpsTeaser'
        }
    }
]