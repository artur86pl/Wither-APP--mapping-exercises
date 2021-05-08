const characters = [
    {
        id: 0,
        name: "Geralt",
        fromWhere: "Rivia",
        occupation: "witcher",
        hairColor: "white",
        image: "./IMG/geralt.jpg"
    },
    {
        id: 1,
        name: "Yenefer",
        fromWhere: "Vengerberg",
        occupation: "mage",
        hairColor: "black",
        image: "./IMG/yenefer.jpg"
    },
    {
        id: 2,
        name: "Jaskier",
        fromWhere: "Redania",
        occupation: "bard",
        hairColor: "brown",
        image: "./IMG/jaskier.jpg"
    },
    {
        id: 3,
        name: "Zoltan",
        fromWhere: "Cintra",
        occupation: "freelancer",
        hairColor: "brown",
        image: "./IMG/zoltan.jpg"
    },
    {
        id: 4,
        name: "Ciri",
        fromWhere: "Cintra",
        occupation: "princess",
        hairColor: "white",
        image: "./IMG/ciri.png"
    },
    {
        id: 5,
        name: "Percival",
        fromWhere: "Mahakam",
        occupation: "metallurgist",
        hairColor: "grey",
        image: "./IMG/Percival1.png"
    },
    {
        id: 6,
        name: "Falka",
        fromWhere: "Redania",
        occupation: "queen",
        hairColor: "brown",
        image: "./IMG/bloody_falka.jpg"
    },
    {
        id: 7,
        name: "Priscilla",
        fromWhere: "Novigrad",
        occupation: "poetess",
        hairColor: "blonde",
        image: "./IMG/Priscilla.jpg"
    }
];

const weapons = [
    {
        id: 0,
        name: "Feline Crossbow",
        type: "ranged",
        dmg: 20,
        price: 449
    },
    {
        id: 1,
        name: "Weeper",
        type: "silver sword",
        dmg: 211,
        price: 110
    },
    {
        id: 2,
        name: "torch",
        type: "wooden",
        dmg: 4,
        price: 2
    },
    {
        id: 3,
        name: "Ard'aenye",
        type: "steel sword",
        dmg: 327,
        price: 547
    },
    {
        id: 4,
        name: "Aerondight",
        type: "silver sword",
        dmg: 491,
        price: 879
    },
    {
        id: 5,
        name: "Iris",
        type: "steel sword",
        dmg: 468,
        price: 925
    },
    {
        id: 6,
        name: "D'yaebl",
        type: "steel sword",
        dmg: 366,
        price: 666
    }
];

const items = [
    {
        id: 0,
        name: "Agate",
        type: "gemstone",
        price: 50
    },
    {
        id: 1,
        name: "Celandine",
        type: "herb",
        price: 5
    },
    {
        id: 2,
        name: "Est Est",
        type: "alcohol",
        price: 75
    },
    {
        id: 3,
        name: "Act script",
        type: "paper",
        price: 150
    },
    {
        id: 4,
        name: "Phylactery",
        type: "magic",
        price: 500
    },
    {
        id: 5,
        name: "Gyve",
        type: "tool",
        price: 25
    },
    {
        id: 6,
        name: "Glejt",
        type: "paper",
        price: 100
    },
    {
        id: 7,
        name: "Witcher medallion",
        type: "magic",
        price: 250
    }
];

const tossCoin = new Audio('./IMG/TossCoin.mp3');
const charactersHeadings = ["ID", "Name", "From Where", "Occupation", "Hair color"];
const weaponsHeading = ["ID", "Name", "Type", "DMG", "Value"];
const itemsHeading = ["ID", "Name", "Type", "Value"];

const changeDocumentById = (where, what) => document.getElementById(where).innerHTML = what;

const findJaskier = () => characters.find(item => item.name === "Jaskier");

const isWeapon = (collectionTest) => !!collectionTest[0].dmg;

const asignEquipment = (characterID, equipmentID, isWeapon) => {
    const EquipmentCollection = isWeapon ? weapons : items;

    const chosenEquipment = EquipmentCollection.find(item => item.id === equipmentID);
    const chosenCharacter = characters.findIndex(item => item.id === characterID);
 
    if (isWeapon) {
            characters[chosenCharacter].weapon = chosenEquipment;
            document.getElementById("dropdownWeapon").innerHTML = chosenEquipment.name;
        }
    else {
            characters[chosenCharacter].item = chosenEquipment;
            document.getElementById("dropdownItem").innerHTML = chosenEquipment.name;
        }    
           
    changeDocumentById("EquipButton", AddEquipButton(characterID, "Disarm"));
};

const dropdownALL = (itemID) => {
        findJaskier().id == itemID ? tossCoin.play() : changeDocumentById("divDropWeapon", dropdownSingle(itemID, weapons));        
        changeDocumentById("divDropItem", dropdownSingle(itemID, items));
    };

const dropdownSingle = (itemID, EquipmentCollection) =>
    `<div class="btn-group">
        <button id="${isWeapon(EquipmentCollection) ? 'dropdownWeapon' : 'dropdownItem'}" 
                type="button" 
                class="btn btn-info dropdown-toggle" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">
                    ${isWeapon(EquipmentCollection) ? 'No Weapon' : 'No Item'}
        </button>
        <div class="dropdown-menu">
            ${mapEquipment(itemID, EquipmentCollection)}
        </div>
    </div>`;
    
const stopMusic = (sound) => sound.pause();

const closingAction = (sound) => {
        stopMusic(sound);
        changeDocumentById("EquipButton", "");        
        changeDocumentById("SaveButton", "");        
    };

const AddEquipButton = (item, text) => 
    `<button    type="button" 
                class="btn btn-outline-info" 
                onclick="dropdownALL('${item}')">
                    ${text}
    </button>`;

const SaveButtonDescription = (isCharacter, isWeapon) => 
    `<button    type="button" 
                class="btn btn-${validateButton(isCharacter, isWeapon) ? "success" : "secondary"}" 
                onclick="saveNewElement()" 
                ${!validateButton(isCharacter, isWeapon) ? "disabled" : ""}>
                    Save
    </button>`;

const addSaveButton = (isCharacter, isWeapon) => 
    changeDocumentById("SaveButton", SaveButtonDescription(isCharacter, isWeapon));

const mapEquipment = (charactersID, EquipmentCollection) => 
    (EquipmentCollection.map(item => 
        `<a class="dropdown-item" 
            onclick="asignEquipment(${charactersID}, ${item.id}, ${isWeapon(EquipmentCollection)})">
                ${item.name}
        </a>`).join(""));

const checkButton = (isCharacter, item) => {
    changeDocumentById("EquipButton", isCharacter ? AddEquipButton(item.id, "Equip") : "");
};

const validateButton = (isCharacter, isWeapon) => {   
    const isCharacterValid =    !!newElement.name && !!newElement.fromWhere && !!newElement.occupation && 
                                !!newElement.occupation && !!newElement.hairColor;                                
    const isWeaponValid = !!newElement.name && !!newElement.type && !!newElement.dmg && !!newElement.price;
    const isItemValid = !!newElement.name && !!newElement.type && !!newElement.price;

    return isCharacter && isCharacterValid || isWeapon && isWeaponValid || isItemValid;
}; 

const checkCollection = (identification, isCharacter, isWeapon) => {
    let item = {};
    let header = "";
    if (isCharacter)
        item = characters.find(element => element.id === identification);
    else if (isWeapon)
        item = weapons.find(element => element.id === identification);
    else 
        item = items.find(element => element.id === identification);

    isCharacter && (header = "Character") || isWeapon && (header = "Weapon") || (header = "Item");

    checkButton(isCharacter, item);
    changeDocumentById('modal-box', displayModal(item));
    changeDocumentById('staticBackdropLabel', header);
};

const displayModal = (item) => 
    `<div id="shower">
        <p>
            ${item.name} ${item.fromWhere ? `from ${item.fromWhere}` : ''} 
            ${item.occupation ? `${item.occupation}` : ''}
            ${item.type ? `${item.type}` : ''}
        </p>
        ${item.hairColor ? `<p>Hair color: ${item.hairColor}</p>` : ''}
        ${item.dmg ? `<p>DMG: ${item.dmg}</p>` : ''}
        ${item.price ? `<p>Value: ${item.price}</p>` : ''}
        <div id="divDropWeapon"></div>
        <div id="divDropItem"></div>        
    </div>
    ${item.image ? `<div><img src="${item.image}" alt="${item.name}"></div>` : ''}`;

const newElement = {}; 

const getValue = (id, isCharacter, isWeapon) => {   
    newElement[id] = document.getElementById(id).value;
    addSaveButton(isCharacter, isWeapon);
};

const saveNewElement = () => {
    let copyElement = {};

    if (newElement.occupation) {
            copyElement = {id: characters.length, ...newElement};
            characters.push(copyElement);     
            changeDocumentById('characterBox', renderTable(characters, charactersHeadings));
        }
    else if (newElement.dmg) {
            copyElement = {id: weapons.length, ...newElement};
            weapons.push(copyElement);
            changeDocumentById('weaponsBox', renderTable(weapons, weaponsHeading));
        }
    else {
            copyElement = {id: items.length, ...newElement};
            items.push(copyElement);
            changeDocumentById('itemsBox', renderTable(items, itemsHeading));
        };
};

const displayAddModal = (isCharacter, isWeapon) => 
    `<div id="shower"> 
        <p>
            <label for="inputName">Name</label>
            <input type="text" class="form-control" id="name" onchange="getValue('name', ${isCharacter}, ${isWeapon})">
        </p>
        ${isCharacter ? 
            `<p>
                <label for="inputWhere">From Where</label>
                <input  type="text" class="form-control" id="fromWhere" 
                        onchange="getValue('fromWhere', ${isCharacter}, ${isWeapon})">
            </p>
            <p>
                <label for="inputOccupation">Occupation</label>
                <input  type="text" class="form-control" id="occupation" 
                        onchange="getValue('occupation', ${isCharacter}, ${isWeapon})">
            </p>
            <p>
                <label for="inputHair">Hair</label>
                <input  type="text" class="form-control" id="hairColor" 
                        onchange="getValue('hairColor', ${isCharacter}, ${isWeapon})">
            </p>        
            <p>
                <div class="custom-file">
                    <label class="custom-file-label" for="image">Choose portrait</label>
                    <input  type="file" class="custom-file-input" id="image" aria-describedby="imageAddon" 
                            onchange="getValue('image', ${isCharacter}, ${isWeapon})">
                </div>
            </p>`
            : ""}
        ${!isCharacter ? 
            `<p>
                <label for="inputType">Type</label>
                <input  type="text" class="form-control" id="type" 
                        onchange="getValue('type', ${isCharacter}, ${isWeapon})">
            </p>
            <p>
                <label  for="price">add price</label>
                <input  type="range" class="custom-range" min="0" max="1000" id="price" 
                        onchange="getValue('price', ${isCharacter}, ${isWeapon})">
            </p>` 
            : ""}
        ${isWeapon ? 
            `<p><label for="dmg">add dmg</label>
            <input  type="range" class="custom-range" min="0" max="500" id="dmg" 
                    onchange="getValue('dmg', ${isCharacter}, ${isWeapon})"></p>` 
            : ""}
    </div>`;

const tableMapping = (data) => {
    return data.map(
        item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            ${item.fromWhere ? `<td>${item.fromWhere}</td>` : ''}
            ${item.occupation ? `<td>${item.occupation}</td>` : ''}
            ${item.hairColor ? `<td>${item.hairColor}</td>` : ''}
            ${item.type ? `<td>${item.type}</td>` : ''}
            ${item.dmg ? `<td>${item.dmg}</td>` : ''}
            ${item.price ? `<td>${item.price}</td>` : ''}
            <td>
                <button type="button" 
                        class="btn btn-outline-secondary" 
                        onclick="checkCollection(${item.id}, ${!!item.occupation}, ${!!item.dmg})" 
                        data-toggle="modal" 
                        data-target="#staticBackdrop">
                            View
                </button>
            </td>
        </tr>
    `).join('')
};

const addingModalAndSaveButton = (isCharacter, isWeapon) => {

    addSaveButton(isCharacter, isWeapon);   
    changeDocumentById('modal-box', displayAddModal(isCharacter, isWeapon));
}

const renderTable = (data, columns) => `
    <table class="table table-striped table-dark">
        <thead>
            <tr>
                ${columns.map(column => `
                    <th scope="col">
                        ${column}
                    </th>
                `).join('')}
            </tr>
        </thead>
        <tbody>
            ${tableMapping(data)}
            <tr>
                <td colspan="${columns.length + 1}">                
                    <button type="button" 
                            class="btn btn-outline-secondary" 
                            onclick="addingModalAndSaveButton(${!!data[0].occupation}, ${!!data[0].dmg})" 
                            data-toggle="modal" 
                            data-target="#staticBackdrop">
                                Add
                    </button>
                </td>
            </tr>
        </tbody>
    </table>`;

changeDocumentById('characterBox', renderTable(characters, charactersHeadings));
changeDocumentById('weaponsBox', renderTable(weapons, weaponsHeading));
changeDocumentById('itemsBox', renderTable(items, itemsHeading));
