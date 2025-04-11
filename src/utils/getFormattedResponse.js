const getFormattedResponse = (data) => {
    const formattedResponse = {
        // id: data.id,
        // name: data.name,
        // email: data.email,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        name: data.login,
        // location: data.location,
        // bio: data.bio,
        // public_repos: data.public_repos,
        // followers: data.followers,
        // following: data.following,
    };
    return formattedResponse;
}

const getRepoName = (data) => {
    return data.map((repo) => ({
        name: repo.name,
        id: repo.id,
        url: repo.html_url,
        description: repo.description,
    }))
}

module.exports = { getFormattedResponse, getRepoName };