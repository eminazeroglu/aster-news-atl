import { serviceCategoryList, serviceNewsList, serviceNewsBySlug } from "./service";

const getUiTeplate = (id, selector) => {
    const el = document.getElementById(id);
    const clone = el.content.cloneNode(true);
    return clone.querySelector(selector);
}

const getCategoryIcon = (key) => {
    const icons = {
        world: 'icon-globe',
        politics: 'icon-award',
        sports: 'icon-soccer-ball-o',
        technology: 'icon-monitor',
        economy: 'icon-money',
        entertainment: 'icon-gamepad',
        health: 'icon-globe',
        science: 'icon-globe',
        culture: 'icon-globe',
        environment: 'icon-globe',
    }

    return icons[key]
}

export const uiNavigator = async () => {
    const res = await serviceCategoryList();
    const navContainer = document.getElementById('navigation');
    const template = getUiTeplate('navigation-item', 'a');
    let html = '';
    res.forEach(i => {
        let newTemplate = template;
        newTemplate.querySelector('i').classList = `icon ${getCategoryIcon(i.slug)}`
        newTemplate.querySelector('span').textContent = i.name
        html += newTemplate.outerHTML;
    })
    
    navContainer.innerHTML = html;
}

export const uiSubscription = () => {
    const content = document.getElementById('subscription');
    const item = getUiTeplate('subscription-box', 'div');

    content.innerHTML = item.outerHTML;
}

export const uiNews = async () => {
    const res = await serviceNewsList();
    const content = document.getElementById('news-content');
    const template = getUiTeplate('news-template', 'article');

    let html = '';
    res.forEach(i => {
        let newTeplate = template;
        newTeplate.querySelector('figure img').src = i.photo;
        newTeplate.querySelector('.title').textContent = i.title;
        newTeplate.querySelector('.text').textContent = i.description;
        newTeplate.querySelector('.agency').textContent = i.author.agency;
        newTeplate.querySelector('.read-later').href = `/#/view?slug=${i.slug}`;
        html += newTeplate.outerHTML;
    })

    content.innerHTML = html;
}

export const uiNewsView = async (slug) => {
    const res = await serviceNewsBySlug(slug);
    const content = document.getElementById('news-view');
    const template = getUiTeplate('news-view-content', 'div');
    
}



export const UI = {
    home () {
        uiNews();
    },
    view ({slug}) {
        uiNewsView(slug);
    }
}