const fs = require(`fs`);
const readline = require(`readline-Sync`);
const fControl = require(`./fControl`);

let contacts = fControl.open();

function menu () {
	let choose = readline.question
(`Choose:
1. Show
2. Add new
3. Edit
4. Delete
5. Filter
6. Save and Quit 

>`);
	switch (choose) {
		case('1'): show();
			menu();
			break;
		case('2'): addNew();
			menu();
			break;
		case('3'):
			edit();
			menu();
			break;
		case('4'):
			deleteContact();
			menu();
			break;
		case('5'):
			filter();
			menu();
			break;
		case('6'):
			fControl.close(contacts);
			break;
		default:
			console.log('Wrong choose.');
			menu();
			break;
	}
}

function show() {
	for (let i in contacts)
		console.log(parseInt(i)+1+'. ', contacts[i]);
}

function addNew () {
	let name = readline.question(`Name: `);
	let phone = readline.question(`Phone: `);
	contacts.push({
		name: name,
		phone: phone
	});
	// fControl.close();
}

function filter() {
	let key = readline.question('Enter search Keyword: ');

	let a =  contacts.filter(function (x) {
		return x.name.toLowerCase().indexOf(key.toLowerCase()) != -1;
	});
	let b = contacts.filter(function (x) {
		return x.phone.toLowerCase().indexOf(key.toLowerCase()) != -1;
	});
	if (a.length) {
		console.log('Filter by name:')
		for(i in a)
			console.log((parseInt(i)+1)+'.', a[i]);
	}
		
	if (b.length) {
		console.log('Filter by phone:')
		for(i in b)
			console.log((parseInt(i)+1)+'.', b[i]);
	}
}

function edit() {
	show();
	let choose = 0;

	do
		choose = parseInt(readline.question('Enter sequence number: \n>')) - 1;
	while (!Number.isInteger(choose) || contacts.length-1 < choose || choose < 0);

	let name = readline.question('Enter new name (default by old name): ');
	let phone = readline.question('Enter new phone (default by old phone): ');
	if(!name || !name.length) {
		name = contacts[choose].name;
	}
	if (!phone || !phone.length) {
		phone = contacts[choose].phone;
	}
	contacts[choose] = {name: name, phone: phone};
	console.log('Edited: '); 
	show(); 
	// fControl.close();
}

function deleteContact() {
	show();
	let choose = 0;

	do
		choose = parseInt(readline.question('Enter sequence number: \n>')) - 1;
	while (!Number.isInteger(choose) || contacts.length < choose || choose < 0);

	contacts.splice(choose, 1);
	console.log('Edited: '); 
	show(); 
	// fControl.close();
}

menu();