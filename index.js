// 1
async function getAllBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all')
        const data = await response.json()

        if (data.status === 'success') {
            const breeds = Object.keys(data.message)
            return breeds
        } else {
            throw new Error ('Error al obtener las razas')
        }
    } catch (error) {
        console.error('Error', error)
        return []
    }
}
getAllBreeds().then(breeds => console.log(breeds))

// 2
async function getRandomDog(breed = 'labrador') {
    // ahora tiene valor por defecto
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        const data = await response.json()

        if (data.status === 'success') {
            return data.message
        } else {
            throw new Error('Error al obtener la imagen')
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}
getRandomDog('komondor').then(imageUrl => console.log(imageUrl))

// 3
async function getAllImagesByBreed(breed = 'labrador') {
    // ahora tiene valor por defecto
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()

        if (data.status === 'success') {
            return data.message
        } else {
            throw new Error('Error al obtener la imagen')
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}
getAllImagesByBreed('komondor').then(imageUrl => console.log(imageUrl))

// 4
async function getAllImagesByBreed2(breed = 'labrador') {
    // ahora tiene valor por defecto
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()

        if (data.status === 'success') {
            return data.message
        } else {
            throw new Error('Error al obtener la imagen')
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}
getAllImagesByBreed2('komondor').then(imageUrl => console.log(imageUrl))

// 5
async function getGitHubUserProfile(query = 'Alenriquez96') {
    try {
        // Realizar la solicitud a la API de GitHub para obtener el perfil del usuario
        const response = await fetch(`https://api.github.com/users/${query}`);
        const data = await response.json();

        if (data && data.login) {
            // Retornar los detalles del usuario
            return data; // Incluye información como el nombre, avatar, repositorios, etc.
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

getGitHubUserProfile('Alenriquez96').then(user => console.log(user.name))

// 6
async function printGithubUserProfile(query = 'Alenriquez96') {
    try {
        const response = await fetch(`https://api.github.com/users/${query}`);
        const data = await response.json();

        return {
            name: data.name,
            img: data.avatar_url
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
printGithubUserProfile('Alenriquez96').then(user => {
    console.log(user.name); 
    console.log(user.img);       
});  

// 7
async function getAndPrintGitHubUserProfile(username = 'Alenriquez96') {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();

        // Crear y devolver la tarjeta de usuario en formato HTML
        return `
            <section>
                <img src="${user.avatar_url}" alt="${user.name}"/>
                <h1>${user.name}</h1>
                <p><strong>Username:</strong> ${user.login}</p>
                <p><strong>Location:</strong> ${user.location}</p>
                <p><strong>Public repos:</strong> ${user.public_repos}</p>
                <p><strong>Followers:</strong> ${user.followers}</p>
                <a href="${user.html_url}" target="_blank">View Profile</a>
            </section>
        `
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        return `<section><p>Error al cargar el perfil.</p></section>`;
    }
}
getAndPrintGitHubUserProfile('Alenriquez96').then(html => console.log(html))

// 8
async function fetchGithubUsers(usernames = ['Alenriquez96', 'octocat', 'mojombo']) {
    const userInfoArray = [];

    // Iterar sobre cada nombre de usuario
    for (const username of usernames) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            
            // Verificar si la respuesta es válida
            if (!response.ok) {
                console.error(`No se pudo obtener datos para el usuario: ${username}`);
                continue;  // Si la respuesta no es válida, saltamos al siguiente usuario
            }

            // Obtener los datos en formato JSON
            const user = await response.json();

            // Si los datos no son válidos, mostrar un mensaje y continuar
            if (!user || !user.html_url) {
                console.error(`Datos inválidos para el usuario: ${username}`);
                continue;
            }

            // Verificar que los datos necesarios existen y asignar valores por defecto
            const userName = user.name || user.login || 'Nombre no disponible';
            const userUrl = user.html_url || '#';  // Si no hay URL, asignamos un valor por defecto

            // Crear un objeto con el nombre y la URL del usuario
            userInfoArray.push({
                name: userName,
                url: userUrl
            });
        } catch (error) {
            console.error(`Error al obtener datos de ${username}:`, error);
        }
    }

    return userInfoArray;
}

fetchGithubUsers(['Alenriquez96', 'octocat', 'mojombo']).then(usersInfo => {
    console.log('Información de los usuarios:', usersInfo);
});