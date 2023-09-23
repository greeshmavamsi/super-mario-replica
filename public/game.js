const { Client, Account, Databases, ID, Query } = AppWrite
const projectId = '650eb4c03975a7a67be5'
const databaseId = '650ef832e643bb60b1bc'
const collectionId = '650ef86364a1304e3898'

const client = new Client()
    .setEndPoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)

const account = new Account(client)
const database = new Databases(client)

function register(event) {
    account.create(
        ID.unique(),
        event.target.elements['signup-email'].value,
        event.target.elements['signup-password'].value,
        event.target.elements['signup-username'].value,
    ).then(response =>{
        console.log(response)
        //create a document in a database
        databaseId.createDocument(
            databaseId,
            collectionId,
            response.$id,
            {
                "userid": response.$id,
                "highscore": 0
            }
        )
        account.createEmailSession(
            event.target.elements['signup-email'].value,
            event.target.elements['signup-password'].value
        )
    }).catch(error => console.error(error))
    event.preventDefault()

}