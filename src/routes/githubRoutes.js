const express = require('express');
const { getFormattedResponse, getRepoName } = require('../utils/getFormattedResponse');
const githubRoutes = express.Router();

githubRoutes.post('/token', async (req, res) => {
    console.log('body', req.body);

    const params = new URLSearchParams({
        client_id: 'Ov23li0Q4wmDJ6ycVoJR',
        client_secret: 'ac50227bf3c5e3e355b85a34d1684682484fb209',
        code: req.body.code,
    });

    const url = `https://github.com/login/oauth/access_token?${params}`;
    const resp = await fetch(url);
    const data = await resp.text();
    const parameters = new URLSearchParams(data);
    if (parameters.get('error')) {
        return res.status(400).json({ error: parameters.get('error_description') });
    }

    res.json({ access_token: parameters.get('access_token') });
});

githubRoutes.get('/user', async (req, res) => {
    const url = 'https://api.github.com/user';
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `${req.headers.authorization}`,
            'User-Agent': 'node.js',
        },
    });
    const data = await resp.json();
    const formattedResponse = getFormattedResponse(data);
    console.log('data', formattedResponse);
    res.json(formattedResponse);
});

githubRoutes.post('/pr', async (req, res) => {

    const url = `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/pulls`;
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `${req.body.token}`,
            'User-Agent': 'node.js',
        },
    });
    const data = await resp.json();
    console.log('data', data);
    if (data.length === 0) {
        return res.json({ message: 'No PRs found' });
    }
    const formattedResponse = data.map((item) => ({
        title: item.title,
        id: item.id,
        html_url: item.html_url,
        state: item.state,
        user: {
            login: item.user.login,
            avatar_url: item.user.avatar_url,
            html_url: item.user.html_url,
        },
    }));
    res.json(formattedResponse);
});

githubRoutes.post('/commits', async (req, res) => {

    const url = `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/commits`;
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `${req.body.token}`,
            'User-Agent': 'node.js',
        },
    });
    const data = await resp.json();
    console.log('data', data);
    if (data.length === 0) {
        return res.json({ message: 'No commits' });
    }

    const formattedResponse = data.map((item) => ({
        message: item.commit.message,
        name: item.commit.author.name,
        sha: item.sha,
        html_url: item.html_url,
        date: item.commit.author.date,
    }));

    res.json(formattedResponse);
});

githubRoutes.post('/repos', async (req, res) => {
    console.log('######body#########', req.body);
    const url = `https://api.github.com/users/${req.body.user}/repos`;
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `${req.headers.authorization}`,
            'User-Agent': 'node.js',
        },
    });
    const data = await resp.json();
    const repos = getRepoName(data);
    console.log('data', repos);
    res.json(repos);

});


module.exports = githubRoutes;