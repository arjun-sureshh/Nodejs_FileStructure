const readline = require('node:readline');
const fs = require('fs');
const path = require('path');

// Set up readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to ask questions using promises
const askQuestion = (question) => {
    return new Promise((ans) => {
        rl.question(question, (answer) => {
            ans(answer);
        });
    });
};

// Define the folder path where files will be stored
const folderPath = path.join(__dirname, 'employees');




const insert = async () => {
    try {
        // Collect user input
        const name = await askQuestion(`What's your name? `);
        const Email = await askQuestion(`What's your Email name? `);
        const FsName = await askQuestion(`What's your file name? `);



        // Ensure the 'employees' folder exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath); // Create folder if it doesn't exist
            console.log('Folder "employees" created successfully!');
        }

        // Define the full file path
        const filePath = path.join(folderPath, FsName + '.txt');

        // Write the user input to the file in the 'employees' folder
        fs.writeFile(filePath, `Name: ${name} \nEmail: ${Email}`, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log(`File written successfully to ${filePath}`);
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
};




// read file .............................

const readfile = async () => {
    try {
        const txtName = await askQuestion('Which file do you want to read? ');

        const filePath = path.join(folderPath, txtName + '.txt');
        // Read the file asynchronously
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err.message);
                return;
            }
            console.log(`File contents of ${txtName}:\n${data}`);
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close(); // Ensure rl is closed in all cases
    }

};

//Rename ........................

const Rename = async () => {
    try {
        const txtName = await askQuestion('Which file is you want to Rename : ');
        const filePath = path.join(folderPath, txtName + '.txt');
        const NewtxtName = await askQuestion('Enter your New Text Name : ');
        const NewTxtfilePath = path.join(folderPath, NewtxtName + '.txt');


        fs.rename(filePath, NewTxtfilePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('File renamed successfully!');
        });
    } catch (Error) {

        console.log("Error");

    }
}
/// appendFile................ 

const appende = async () => {

    try {
        const txtName = await askQuestion('Which file you want to Add data ');
        const filePath = path.join(folderPath, txtName + '.txt');
        const txtNameKey = await askQuestion('Write the key : ');
        const AddData = await askQuestion('Write what want to save :');



        // Read the file asynchronously
        fs.appendFile(filePath, `\n ${txtNameKey} : ${AddData}  `, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data appended to file!');
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close(); // Ensure rl is closed in all cases
    }
}

// choose one case............
const chooseOne = async () => {
    try {


        const chooseFun = await askQuestion(' 1 : Write a file \n 2 : Read the file \n 3 : rename the file \n 4 : Add data \n chose one this ?\n');

        const SwitchNumber = chooseFun - 1;

        switch (SwitchNumber) {
            case 0:
                return insert(); // Assuming 'insert' is a function
            case 1:
                return readfile(); // Assuming 'readfile' is a function
            case 2:
                return Rename();
            case 3:
                return appende();
            default:
                console.log("Choose the proper one"); // Log message if no valid case
                return; // Or you can return a message if needed
        }
    } catch (error) {
        console.log(error);

    }
}
chooseOne()



















// fs.readFile('file.txt', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data.toString());
//   });

//   fs.writeFile('file.txt', 'Hello, World!', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File written successfully!');
//   });


//   fs.appendFile('file.txt', 'Hello, World!', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('Data appended to file!');
//   });


//   fs.rename('file.txt', 'new-file.txt', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File renamed successfully!');
//   });