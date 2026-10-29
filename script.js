function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let array = [];
let isRunning = false;

function generateArray() {

    if (isRunning) return;

    let size =
        Number(document.getElementById("arraySize").value);

    array = [];

    for (let i = 0; i < size; i++) {
        array.push(
            Math.floor(Math.random() * 100) + 1
        );
    }

    document.getElementById("arraySizeValue").innerText =
        size;

    displayArray();

    document.getElementById("status").innerText =
        "Array generated. Select an algorithm and click Visualize.";
}

function displayArray(highlightIndexes = [], foundIndex = -1) {

    let container =
        document.getElementById("array");

    if (!container) return;

    container.innerHTML = "";

    array.forEach((value, index) => {

        let bar = document.createElement("div");

        bar.classList.add("array-bar");

        bar.style.height =
            (value * 3) + "px";

        bar.innerText = value;

        if (highlightIndexes.includes(index)) {
            bar.classList.add("active");
        }

        if (index === foundIndex) {
            bar.classList.add("found");
        }

        container.appendChild(bar);
    });
}

let arraySizeInput =
    document.getElementById("arraySize");

if (arraySizeInput) {

    arraySizeInput.addEventListener("input", function () {

        document.getElementById("arraySizeValue").innerText =
            this.value;
    });
}

async function startAlgorithm() {

    if (isRunning) return;

    if (array.length === 0) {
        alert("Generate an array first.");
        return;
    }

    let algorithm =
        document.getElementById("algorithm").value;

    isRunning = true;

    switch (algorithm) {

        case "bubble":
            await bubbleSort();
            break;

        case "selection":
            await selectionSort();
            break;

        case "insertion":
            await insertionSort();
            break;

        case "merge":
            await mergeSort();
            break;

        case "quick":
            await quickSort();
            break;

        case "linear":
            await linearSearch();
            break;

        case "binary":
            await binarySearch();
            break;

        default:
            document.getElementById("status").innerText =
                "Select an algorithm.";
    }

    isRunning = false;
}

function getSpeed() {

    let speed =
        document.getElementById("speed");

    return speed ? Number(speed.value) : 300;
}

function showComparison(value1, value2) {

    let message = document.getElementById("comparisonMessage");

    if (!message) {
        message = document.createElement("div");
        message.id = "comparisonMessage";

        message.style.textAlign = "center";
        message.style.fontSize = "20px";
        message.style.fontWeight = "700";
        message.style.padding = "14px";
        message.style.marginTop = "15px";
        message.style.borderTop = "2px solid #f5c400";
        message.style.borderBottom = "2px solid #f5c400";

        let arrayContainer =
            document.getElementById("arrayContainer");

        if (arrayContainer) {
            arrayContainer.parentNode.insertBefore(
                message,
                arrayContainer.nextSibling
            );
        }
    }

    message.innerText =
        "Comparing " + value1 + " and " + value2;
}

async function bubbleSort() {

    let n = array.length;

    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - i - 1; j++) {

            displayArray([j, j + 1]);

            document.getElementById("status").innerText =
                "Comparing " +
                array[j] +
                " and " +
                array[j + 1];

            await sleep(getSpeed());
            if (array[j] > array[j + 1]) {
                
                let temp = array[j];

                array[j] = array[j + 1];

                array[j + 1] = temp;
            }
        }
    }

    displayArray();

    document.getElementById("status").innerText =
        "✅ Bubble Sort completed.";
        updateProgress("sorting", "bubble");
}

async function selectionSort() {

    let n = array.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        for (let j = i + 1; j < n; j++) {

            displayArray([minIndex, j]);

            await sleep(getSpeed());
                
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {

            let temp = array[i];

            array[i] = array[minIndex];

            array[minIndex] = temp;
        }
    }

    displayArray();

    document.getElementById("status").innerText =
        "✅ Selection Sort completed.";
        updateProgress("sorting", "selection");
}

async function insertionSort() {

    for (let i = 1; i < array.length; i++) {

        let key = array[i];

        let j = i - 1;

        while (j >= 0 && array[j] > key) {

            displayArray([j, j + 1]);

            await sleep(getSpeed());
            
            array[j + 1] = array[j];

            j--;
        }

        array[j + 1] = key;
    }

    displayArray();

    document.getElementById("status").innerText =
        "✅ Insertion Sort completed.";
        updateProgress("sorting", "insertion");
}

async function mergeSort() {

    await mergeSortRecursive(
        0,
        array.length - 1
    );

    displayArray();

    document.getElementById("status").innerText =
        "✅ Merge Sort completed.";
        updateProgress("sorting", "merge");
}


async function mergeSortRecursive(left, right) {

    if (left >= right) return;

    let middle =
        Math.floor((left + right) / 2);

    await mergeSortRecursive(
        left,
        middle
    );

    await mergeSortRecursive(
        middle + 1,
        right
    );

    await merge(left, middle, right);
}


async function merge(left, middle, right) {

    let leftArray =
        array.slice(left, middle + 1);

    let rightArray =
        array.slice(middle + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (
        i < leftArray.length &&
        j < rightArray.length
    ) {

        displayArray([k]);

        await sleep(getSpeed());
      
        if (leftArray[i] <= rightArray[j]) {

            array[k] = leftArray[i];

            i++;

        } else {

            array[k] = rightArray[j];

            j++;
        }

        k++;
    }

    while (i < leftArray.length) {

        array[k] = leftArray[i];

        i++;
        k++;

        displayArray([k - 1]);

        await sleep(getSpeed());
    }

    while (j < rightArray.length) {

        array[k] = rightArray[j];

        j++;
        k++;

        displayArray([k - 1]);

        await sleep(getSpeed());
    }
}

async function quickSort() {

    await quickSortRecursive(
        0,
        array.length - 1
    );

    displayArray();

    document.getElementById("status").innerText =
        "✅ Quick Sort completed.";
        updateProgress("sorting", "quick");  
}


async function quickSortRecursive(low, high) {

    if (low < high) {

        let pivotIndex =
            await partition(low, high);

        await quickSortRecursive(
            low,
            pivotIndex - 1
        );

        await quickSortRecursive(
            pivotIndex + 1,
            high
        );
    }
}


async function partition(low, high) {

    let pivot = array[high];

    let i = low - 1;

    for (let j = low; j < high; j++) {

        displayArray([j, high]);

        await sleep(getSpeed());

        if (array[j] < pivot) {

            i++;

            let temp = array[i];

            array[i] = array[j];

            array[j] = temp;
        }
    }

    let temp = array[i + 1];

    array[i + 1] = array[high];

    array[high] = temp;

    return i + 1;
}

async function linearSearch() {

    let input =
        document.getElementById("searchValue");

    if (!input || input.value === "") {

        alert("Enter a search value.");

        return;
    }

    let value = Number(input.value);

    for (let i = 0; i < array.length; i++) {

        displayArray([i]);

        document.getElementById("status").innerText =
            "🔍 Checking index " +
            i +
            " : " +
            array[i];

        await sleep(getSpeed());

        if (array[i] === value) {

            displayArray([], i);

            document.getElementById("status").innerText =
                "✅ Value " +
                value +
                " found at index " +
                i + ".";

            updateProgress("searching", "linear");

            return;
        }
    }

    displayArray();

    document.getElementById("status").innerText =
        "❌ Value " +
        value +
        " not found.";

}

async function binarySearch() {

    let input =
        document.getElementById("searchValue");

    if (!input || input.value === "") {

        alert("Enter a search value.");

        return;
    }

    let value = Number(input.value);

    array.sort((a, b) => a - b);

    displayArray();

    let left = 0;

    let right = array.length - 1;

    while (left <= right) {

        let middle =
            Math.floor((left + right) / 2);

        displayArray([middle]);

        document.getElementById("status").innerText =
            "🔍 Checking middle value " +
            array[middle];

        await sleep(getSpeed());

        if (array[middle] === value) {

            displayArray([], middle);

            document.getElementById("status").innerText =
                "✅ Value " +
                value +
                " found at index " +
                middle + ".";

                updateProgress("searching", "binary");
            return;
        }

        if (value < array[middle]) {

            right = middle - 1;

        } else {

            left = middle + 1;
        }
    }

    displayArray();

    document.getElementById("status").innerText =
        "❌ Value " +
        value +
        " not found.";
}

function resetVisualizer() {

    if (isRunning) return;

    array = [];

    let container =
        document.getElementById("array");

    if (container) {
        container.innerHTML = "";
    }

    document.getElementById("status").innerText =
        "Generate an array to begin.";
}

let stack = [];

const MAX_STACK_SIZE = 8;

function pushStack() {

    let input =
        document.getElementById("stackValue");

    let value = input.value;

    if (value === "") {

        alert("Please enter a value.");

        return;
    }

    if (stack.length >= MAX_STACK_SIZE) {

        document.getElementById("stackStatus").innerText =
            "❌ Stack Overflow! Maximum size is " +
            MAX_STACK_SIZE + ".";

        return;
    }

    stack.push(Number(value));

    displayStack();
    updateProgress("dataStructures", "stack_push");

    document.getElementById("stackStatus").innerText =
        "➕ Pushed " +
        value +
        " onto the stack.";

    input.value = "";
}

async function popStack() {

    if (stack.length === 0) {

        document.getElementById("stackStatus").innerText =
            "❌ Stack Underflow! Stack is empty.";

        return;
    }

    let container =
        document.getElementById("stack");

    let elements =
        container.querySelectorAll(".stack-element");

    if (elements.length > 0) {

        let topElement =
            elements[elements.length - 1];

        topElement.classList.add("stack-pop");

        document.getElementById("stackStatus").innerText =
            "Removing top element...";

        await sleep(400);
    }

    let removed = stack.pop();

    displayStack();
    updateProgress("dataStructures", "stack_pop");
    document.getElementById("stackStatus").innerText =
        "➖ Popped " +
        removed +
        " from the stack.";
}

function peekStack() {

    if (stack.length === 0) {

        document.getElementById("stackStatus").innerText =
            "❌ Stack is empty.";

        return;
    }

    let top =
        stack[stack.length - 1];

    document.getElementById("stackStatus").innerText =
        "👀 Top element is " + top;
        updateProgress("dataStructures", "stack_peek");
}

function displayStack() {

    let container =
        document.getElementById("stack");

    if (!container) return;

    container.innerHTML = "";

    stack.forEach((value, index) => {

        let element =
            document.createElement("div");

        element.classList.add("stack-element");

        element.innerText = value;

        if (index === stack.length - 1) {

            element.classList.add("stack-top");

            element.innerHTML =
                value +
                " <span>← TOP</span>";
        }

        container.appendChild(element);
    });

    let sizeElement =
        document.getElementById("stackSize");

    if (sizeElement) {

        sizeElement.innerText =
            "Stack Size: " +
            stack.length +
            " / " +
            MAX_STACK_SIZE;
    }
}

function clearStack() {

    stack = [];

    displayStack();

    document.getElementById("stackStatus").innerText =
        "Stack is empty.";
        updateProgress("dataStructures", "stack_clear");
}

let queue = [];

const MAX_QUEUE_SIZE = 8;

function enqueue() {

    let input =
        document.getElementById("queueValue");

    let value = input.value;

    if (value === "") {

        alert("Please enter a value.");

        return;
    }

    if (queue.length >= MAX_QUEUE_SIZE) {

        document.getElementById("queueStatus").innerText =
            "❌ Queue Overflow! Maximum size is " +
            MAX_QUEUE_SIZE + ".";

        return;
    }

    queue.push(Number(value));

    displayQueue();
    updateProgress("dataStructures", "queue_enqueue");
    document.getElementById("queueStatus").innerText =
        "Enqueued " +
        value +
        " into the queue. (" +
        queue.length +
        "/" +
        MAX_QUEUE_SIZE +
        ")";

    input.value = "";
}

async function dequeue() {

    if (queue.length === 0) {

        document.getElementById("queueStatus").innerText =
            "❌ Queue Underflow! Queue is empty.";

        return;
    }

    let container =
        document.getElementById("queue");

    let elements =
        container.querySelectorAll(".queue-element");

    if (elements.length > 0) {

        let frontElement =
            elements[0];

        frontElement.classList.add("queue-dequeue");

        document.getElementById("queueStatus").innerText =
            "Removing front element...";

        await sleep(400);
    }

    let removed =
        queue.shift();

    displayQueue();

    updateProgress("dataStructures", "queue_dequeue");

    document.getElementById("queueStatus").innerText =
        "Dequeued " +
        removed +
        " from the queue.";
}

function peekQueue() {

    if (queue.length === 0) {

        document.getElementById("queueStatus").innerText =
            "❌ Queue is empty.";

        return;
    }

    let front =
        queue[0];

    document.getElementById("queueStatus").innerText =
        "👀 Front element is " + front;
    updateProgress("dataStructures", "queue_peek");
}

function displayQueue() {

    let container =
        document.getElementById("queue");

    if (!container) return;

    container.innerHTML = "";

    queue.forEach((value, index) => {

        let element =
            document.createElement("div");

        element.classList.add("queue-element");

        element.innerText = value;

        if (index === 0) {

            element.classList.add("queue-front");

            element.innerHTML =
                value +
                " <span>← FRONT</span>";
        }

        if (
            index === queue.length - 1 &&
            index !== 0
        ) {

            element.classList.add("queue-rear");

            element.innerHTML =
                value +
                " <span>REAR →</span>";
        }

        container.appendChild(element);
    });

    let sizeElement =
        document.getElementById("queueSize");

    if (sizeElement) {

        sizeElement.innerText =
            "Queue Size: " +
            queue.length +
            " / " +
            MAX_QUEUE_SIZE;
    }
}

function clearQueue() {

    queue = [];

    displayQueue();

    document.getElementById("queueStatus").innerText =
        "Queue is empty.";
    updateProgress("dataStructures", "queue_clear");
}

let linkedList = [];

function insertNode() {

    let input =
        document.getElementById("linkedListValue");

    let value = input.value;

    if (value === "") {

        alert("Please enter a value.");

        return;
    }

    let newValue = Number(value);

    linkedList.push(newValue);

    displayLinkedList();
    updateProgress("dataStructures", "insert_linkedlist");

    let nodes =
        document.querySelectorAll(".linked-node");

    let newNode =
        nodes[nodes.length - 1];

    if (newNode) {

        newNode.classList.remove("nodeAppear");

        newNode.classList.add("insert-node");

        document.getElementById("linkedListStatus").innerText =
            "➕ Inserting " +
            newValue +
            "...";

        setTimeout(() => {

            newNode.classList.remove("insert-node");

            document.getElementById("linkedListStatus").innerText =
                "✅ Inserted " +
                newValue +
                " into the linked list.";

        }, 500);

    }

    input.value = "";
}

async function deleteNode() {

    let input =
        document.getElementById("linkedListValue");

    let value = input.value;

    if (value === "") {

        alert("Enter the value you want to delete.");

        return;
    }

    let deleteValue =
        Number(value);

    let index =
        linkedList.indexOf(deleteValue);

    if (index === -1) {

        document.getElementById("linkedListStatus").innerText =
            "❌ Value " +
            deleteValue +
            " not found.";

        return;
    }

    let container =
        document.getElementById("linkedList");

    let nodes =
        container.querySelectorAll(".linked-node");

    nodes[index].classList.add("delete-node");

    document.getElementById("linkedListStatus").innerText =
        "🗑️ Deleting " +
        deleteValue +
        "...";

    await sleep(500);

    linkedList.splice(index, 1);

    displayLinkedList();

    document.getElementById("linkedListStatus").innerText =
        "✅ Deleted " +
        deleteValue +
        " from the linked list.";

    input.value = "";
        updateProgress("dataStructures", "delete_linkedlist");

}

async function searchNode() {

    let input =
        document.getElementById("linkedListValue");

    let value = input.value;

    if (value === "") {

        alert("Enter a value to search.");

        return;
    }

    let searchValue =
        Number(value);

    let container =
        document.getElementById("linkedList");

    let nodes =
        container.querySelectorAll(".linked-node");

    nodes.forEach(node => {

        node.classList.remove(
            "searching-node",
            "found-node"
        );
    });

    document.getElementById("linkedListStatus").innerText =
        "🔍 Starting search...";

    for (
        let i = 0;
        i < linkedList.length;
        i++
    ) {

        nodes =
            container.querySelectorAll(".linked-node");

        nodes[i].classList.add(
            "searching-node"
        );

        document.getElementById("linkedListStatus").innerText =
            "🔍 Checking node " +
            (i + 1) +
            " : " +
            linkedList[i];

        await sleep(600);

        if (linkedList[i] === searchValue) {

            nodes[i].classList.remove(
                "searching-node"
            );

            nodes[i].classList.add(
                "found-node"
            );

            document.getElementById("linkedListStatus").innerText =
                "✅ Value " +
                searchValue +
                " found at position " +
                (i + 1) +
                ".";
                updateProgress("dataStructures", "search_linkedlist");
            return;
        }

        nodes[i].classList.remove(
            "searching-node"
        );
    }

    document.getElementById("linkedListStatus").innerText =
        "❌ Value " +
        searchValue +
        " not found.";
                updateProgress("dataStructures", "search_linkedlist");
}

function displayLinkedList() {

    let container =
        document.getElementById("linkedList");

    let headLabel =
        document.getElementById("linkedListHead");

    let tailLabel =
        document.getElementById("linkedListTail");

    if (!container) return;

    container.innerHTML = "";

    if (linkedList.length === 0) {

        headLabel.style.display = "none";

        tailLabel.style.display = "none";

        document.getElementById("linkedListSize").innerText =
            "List Size: 0";

        return;
    }

    headLabel.style.display = "block";

    tailLabel.style.display = "block";

    linkedList.forEach((value, index) => {

        let node =
            document.createElement("div");

        node.classList.add("linked-node");

        node.innerText = value;

        if (index === 0) {
            node.classList.add("head-node");
        }

        if (index === linkedList.length - 1) {
            node.classList.add("tail-node");
        }

        container.appendChild(node);

        if (index < linkedList.length - 1) {

            let arrow =
                document.createElement("div");

            arrow.classList.add("linked-arrow");

            arrow.innerText = "→";

            container.appendChild(arrow);
        }
    });

    let nullElement =
        document.createElement("div");

    nullElement.classList.add("linked-null");

    nullElement.innerText =
        "→ NULL";

    container.appendChild(nullElement);

    document.getElementById("linkedListSize").innerText =
        "List Size: " +
        linkedList.length;

}

function clearLinkedList() {

    linkedList = [];

    displayLinkedList();

    document.getElementById("linkedListStatus").innerText =
        "Linked List is empty.";
    updateProgress("dataStructures", "clear_linkedlist");
}

async function traverseLinkedList() {

    if (linkedList.length === 0) {

        document.getElementById("linkedListStatus").innerText =
            "❌ Cannot traverse. Linked List is empty.";

        return;
    }

    let container =
        document.getElementById("linkedList");

    let nodes =
        container.querySelectorAll(".linked-node");

    nodes.forEach(node => {

        node.classList.remove(
            "traversing-node"
        );
    });

    document.getElementById("linkedListStatus").innerText =
        "🚶 Traversing from HEAD...";

    for (
        let i = 0;
        i < linkedList.length;
        i++
    ) {

        nodes =
            container.querySelectorAll(".linked-node");

        nodes[i].classList.add(
            "traversing-node"
        );

        document.getElementById("linkedListStatus").innerText =
            "🚶 Visiting node " +
            (i + 1) +
            " : " +
            linkedList[i];

        await sleep(700);

        nodes[i].classList.remove(
            "traversing-node"
        );
    }

    document.getElementById("linkedListStatus").innerText =
        "✅ Traversal completed. Reached NULL.";
    updateProgress("dataStructures", "traverse_linkedlist");
}

let bstRoot = null;


function createBSTNode(value) {

    return {
        value: value,
        left: null,
        right: null
    };
}


function insertBST() {

    let input =
        document.getElementById("treeValue");

    let value = input.value;

    if (value === "") {

        alert("Please enter a value.");

        return;
    }

    value = Number(value);

    if (bstRoot === null) {

        bstRoot =
            createBSTNode(value);

    } else {

        insertBSTNode(
            bstRoot,
            value
        );
    }

    displayBST();
    updateProgress("dataStructures", "bst");

    document.getElementById("treeStatus").innerText =
        "✅ Inserted " +
        value +
        " into the BST.";

    input.value = "";
}

function insertBSTNode(node, value) {

    if (value < node.value) {

        if (node.left === null) {

            node.left =
                createBSTNode(value);

        } else {

            insertBSTNode(
                node.left,
                value
            );
        }

    } else if (value > node.value) {

        if (node.right === null) {

            node.right =
                createBSTNode(value);

        } else {

            insertBSTNode(
                node.right,
                value
            );
        }

    } else {

        document.getElementById("treeStatus").innerText =
            "⚠️ Duplicate values are not allowed.";
    }
}


function displayBST() {

    let container =
        document.getElementById("tree");

    if (!container) return;

    container.innerHTML = "";

    if (bstRoot === null) {

        container.innerText =
            "Tree is empty.";

        return;
    }

    let rootElement =
        createTreeElement(bstRoot);

    container.appendChild(rootElement);
}

function createTreeElement(node) {

    let nodeContainer =
        document.createElement("div");

    nodeContainer.classList.add(
        "tree-node-container"
    );

    let nodeElement =
        document.createElement("div");

    nodeElement.classList.add(
        "tree-node"
    );

    nodeElement.innerText =
        node.value;

    nodeContainer.appendChild(
        nodeElement
    );

    if (
        node.left !== null ||
        node.right !== null
    ) {

        let children =
            document.createElement("div");

        children.classList.add(
            "tree-children"
        );

        if (node.left !== null) {

            children.appendChild(
                createTreeElement(node.left)
            );
        }

        if (node.right !== null) {

            children.appendChild(
                createTreeElement(node.right)
            );
        }

        nodeContainer.appendChild(
            children
        );
    }

    return nodeContainer;
}

async function searchBST() {

    let input =
        document.getElementById("treeValue");

    let value = input.value;

    if (value === "") {

        alert("Enter a value to search.");

        return;
    }

    value = Number(value);

    if (bstRoot === null) {

        document.getElementById("treeStatus").innerText =
            "❌ Tree is empty.";

        return;
    }

    let current = bstRoot;

    while (current !== null) {

        let nodes =
            document.querySelectorAll(".tree-node");

        for (let node of nodes) {

            if (
                Number(node.innerText) ===
                current.value
            ) {

                node.classList.add(
                    "tree-searching"
                );

                document.getElementById("treeStatus").innerText =
                    "🔍 Checking node " +
                    current.value;

                await sleep(700);

                if (current.value === value) {

                    node.classList.remove(
                        "tree-searching"
                    );

                    node.classList.add(
                        "tree-found"
                    );

                    document.getElementById("treeStatus").innerText =
                        "✅ Value " +
                        value +
                        " found!";

                    return;
                }

                node.classList.remove(
                    "tree-searching"
                );

                break;
            }
        }

        if (value < current.value) {

            current = current.left;

        } else {

            current = current.right;
        }
    }

    document.getElementById("treeStatus").innerText =
        "❌ Value " +
        value +
        " not found.";

    input.value = "";
}


/* DELETE BST */

async function deleteBST() {

    let input =
        document.getElementById("treeValue");

    let value = input.value;

    if (value === "") {

        alert("Enter the value you want to delete.");

        return;
    }

    value = Number(value);

    if (bstRoot === null) {

        document.getElementById("treeStatus").innerText =
            "❌ Tree is empty.";

        return;
    }

    if (!findBST(bstRoot, value)) {

        document.getElementById("treeStatus").innerText =
            "❌ Value " +
            value +
            " not found.";

        return;
    }

    let nodes =
        document.querySelectorAll(".tree-node");

    for (let node of nodes) {

        if (Number(node.innerText) === value) {

            node.classList.add(
                "tree-deleting"
            );

            document.getElementById("treeStatus").innerText =
                "🗑️ Deleting node " +
                value +
                "...";

            await sleep(600);

            break;
        }
    }

    bstRoot =
        deleteBSTNode(
            bstRoot,
            value
        );

    displayBST();

    document.getElementById("treeStatus").innerText =
        "✅ Deleted " +
        value +
        " from the BST.";

    input.value = "";
}

function deleteBSTNode(node, value) {

    if (node === null) {
        return null;
    }

    if (value < node.value) {

        node.left =
            deleteBSTNode(
                node.left,
                value
            );

    } else if (value > node.value) {

        node.right =
            deleteBSTNode(
                node.right,
                value
            );

    } else {

        if (node.left === null) {
            return node.right;
        }

        if (node.right === null) {
            return node.left;
        }

        let successor =
            node.right;

        while (successor.left !== null) {

            successor =
                successor.left;
        }

        node.value =
            successor.value;

        node.right =
            deleteBSTNode(
                node.right,
                successor.value
            );
    }

    return node;
}

function findBST(node, value) {

    while (node !== null) {

        if (value === node.value) {
            return true;
        }

        if (value < node.value) {

            node = node.left;

        } else {

            node = node.right;
        }
    }

    return false;
}

function clearBST() {

    bstRoot = null;

    displayBST();

    document.getElementById("treeStatus").innerText =
        "Binary Search Tree is empty.";
}

async function inorderTraversal() {

    if (bstRoot === null) {

        document.getElementById("treeStatus").innerText =
            "❌ Tree is empty.";

        return;
    }

    let result = [];

    inorder(
        bstRoot,
        result
    );

    await animateBSTTraversal(
        result,
        "Inorder"
    );
}


function inorder(node, result) {

    if (node === null) return;

    inorder(
        node.left,
        result
    );

    result.push(node.value);

    inorder(
        node.right,
        result
    );
}

async function preorderTraversal() {

    if (bstRoot === null) {

        document.getElementById("treeStatus").innerText =
            "❌ Tree is empty.";

        return;
    }

    let result = [];

    preorder(
        bstRoot,
        result
    );

    await animateBSTTraversal(
        result,
        "Preorder"
    );
}


function preorder(node, result) {

    if (node === null) return;

    result.push(node.value);

    preorder(
        node.left,
        result
    );

    preorder(
        node.right,
        result
    );
}

async function postorderTraversal() {

    if (bstRoot === null) {

        document.getElementById("treeStatus").innerText =
            "❌ Tree is empty.";

        return;
    }

    let result = [];

    postorder(
        bstRoot,
        result
    );

    await animateBSTTraversal(
        result,
        "Postorder"
    );
}


function postorder(node, result) {

    if (node === null) return;

    postorder(
        node.left,
        result
    );

    postorder(
        node.right,
        result
    );

    result.push(node.value);
}

async function animateBSTTraversal(
    result,
    type
) {

    let nodes =
        document.querySelectorAll(
            ".tree-node"
        );

    nodes.forEach(node => {

        node.classList.remove(
            "tree-traversing"
        );
    });

    for (
        let i = 0;
        i < result.length;
        i++
    ) {

        for (let node of nodes) {

            if (
                Number(node.innerText) ===
                result[i]
            ) {

                node.classList.add(
                    "tree-traversing"
                );

                document.getElementById("treeStatus").innerText =
                    "🔍 " +
                    type +
                    " → Visiting " +
                    result[i];

                await sleep(700);

                break;
            }
        }
    }

    nodes.forEach(node => {

        node.classList.remove(
            "tree-traversing"
        );
    });

    document.getElementById("treeStatus").innerText =
        "✅ " +
        type +
        " Traversal: " +
        result.join(" → ");
}

let graph = {};

function addGraphNode() {

    let input =
        document.getElementById("graphNodeValue");

    let value = input.value;

    if (value === "") {

        alert("Enter a node value.");

        return;
    }

    value = Number(value);

    if (graph[value]) {

        document.getElementById("graphStatus").innerText =
            "⚠️ Node " +
            value +
            " already exists.";

        return;
    }

    graph[value] = [];

    displayGraph();

    document.getElementById("graphStatus").innerText =
        "✅ Node " +
        value +
        " added.";

    input.value = "";
}

function addGraphEdge() {

    let fromInput =
        document.getElementById("graphFrom");

    let toInput =
        document.getElementById("graphTo");

    let from = fromInput.value;

    let to = toInput.value;

    if (
        from === "" ||
        to === ""
    ) {

        alert("Enter both From and To values.");

        return;
    }

    from = Number(from);

    to = Number(to);

    if (
        !graph[from] ||
        !graph[to]
    ) {

        document.getElementById("graphStatus").innerText =
            "❌ Both nodes must exist before adding an edge.";

        return;
    }

    if (from === to) {

        document.getElementById("graphStatus").innerText =
            "⚠️ A node cannot connect to itself.";

        return;
    }

    if (graph[from].includes(to)) {

        document.getElementById("graphStatus").innerText =
            "⚠️ Edge already exists.";

        return;
    }


    graph[from].push(to);

    graph[to].push(from);

    displayGraph();

    document.getElementById("graphStatus").innerText =
        "✅ Edge added: " +
        from +
        " ↔ " +
        to;

    fromInput.value = "";

    toInput.value = "";
}


function displayGraph() {

    let container =
        document.getElementById("graph");

    if (!container) return;

    container.innerHTML = "";

    let nodes =
        Object.keys(graph);

    if (nodes.length === 0) {
        return;
    }

    let positions = {};

    nodes.forEach((value, index) => {

        let angle =
            (index / nodes.length) *
            Math.PI *
            2;

        let x =
            50 +
            Math.cos(angle) * 35;

        let y =
            50 +
            Math.sin(angle) * 35;

        positions[value] = {
            x: x,
            y: y
        };
    });


    let svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    svg.classList.add(
        "graph-svg"
    );

    svg.setAttribute(
        "viewBox",
        "0 0 100 100"
    );

    svg.setAttribute(
        "preserveAspectRatio",
        "none"
    );

    container.appendChild(svg);


    let drawnEdges = [];

    nodes.forEach(from => {

        graph[from].forEach(to => {

            let edgeId =
                [
                    Number(from),
                    Number(to)
                ]
                .sort((a, b) => a - b)
                .join("-");

            if (
                drawnEdges.includes(edgeId)
            ) {
                return;
            }

            drawnEdges.push(edgeId);

            let fromPosition =
                positions[from];

            let toPosition =
                positions[to];

            let dx =
                toPosition.x -
                fromPosition.x;

            let dy =
                toPosition.y -
                fromPosition.y;

            let distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            let nodeRadius = 4;

            let offsetX =
                (dx / distance) *
                nodeRadius;

            let offsetY =
                (dy / distance) *
                nodeRadius;

            let line =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                );

            line.classList.add(
                "graph-edge"
            );

            line.setAttribute(
                "x1",
                fromPosition.x +
                offsetX
            );

            line.setAttribute(
                "y1",
                fromPosition.y +
                offsetY
            );

            line.setAttribute(
                "x2",
                toPosition.x -
                offsetX
            );

            line.setAttribute(
                "y2",
                toPosition.y -
                offsetY
            );

            svg.appendChild(line);
        });
    });


    nodes.forEach(value => {

        let position =
            positions[value];

        let node =
            document.createElement("div");

        node.classList.add(
            "graph-node"
        );

        node.innerText =
            value;

        node.style.left =
            position.x + "%";

        node.style.top =
            position.y + "%";

        node.style.transform =
            "translate(-50%, -50%)";

        container.appendChild(node);
    });
}

function clearGraph() {

    graph = {};

    displayGraph();

    document.getElementById("graphStatus").innerText =
        "Graph is empty.";
}

async function startBFS() {

    let nodes =
        Object.keys(graph);

    if (nodes.length === 0) {

        document.getElementById("graphStatus").innerText =
            "❌ Graph is empty.";

        return;
    }

    let input =
        document.getElementById(
            "graphStartNode"
        );

    if (!input) {

        document.getElementById("graphStatus").innerText =
            "❌ Start node input is missing.";

        return;
    }

    let startValue =
        input.value;

    if (startValue === "") {

        alert("Enter a starting node.");

        return;
    }

    let startNode =
        Number(startValue);

    if (!graph[startNode]) {

        document.getElementById("graphStatus").innerText =
            "❌ Starting node " +
            startNode +
            " does not exist.";

        return;
    }

    clearGraphHighlights();

    let visited =
        new Set();

    let bfsQueue = [];

    let traversalResult = [];

    bfsQueue.push(startNode);

    visited.add(startNode);

    document.getElementById("graphStatus").innerText =
        "🔍 BFS started from node " +
        startNode;


    while (bfsQueue.length > 0) {

        let current =
            bfsQueue.shift();

        traversalResult.push(
            current
        );

        highlightGraphNode(
            current
        );

        document.getElementById("graphStatus").innerText =
            "🔍 BFS → Visiting node " +
            current;

        await sleep(700);

        for (
            let neighbor of graph[current]
        ) {

            if (
                !visited.has(neighbor)
            ) {

                visited.add(neighbor);

                bfsQueue.push(
                    neighbor
                );
            }
        }
    }

    document.getElementById("graphStatus").innerText =
        "✅ BFS Traversal: " +
        traversalResult.join(" → ");
        updateProgress("graphs", "bfs");
}

async function startDFS() {

    let nodes =
        Object.keys(graph);

    if (nodes.length === 0) {

        document.getElementById("graphStatus").innerText =
            "❌ Graph is empty.";

        return;
    }

    let input =
        document.getElementById(
            "graphStartNode"
        );

    if (!input) {

        document.getElementById("graphStatus").innerText =
            "❌ Start node input is missing.";

        return;
    }

    let startValue =
        input.value;

    if (startValue === "") {

        alert("Enter a starting node.");

        return;
    }

    let startNode =
        Number(startValue);

    if (!graph[startNode]) {

        document.getElementById("graphStatus").innerText =
            "❌ Starting node " +
            startNode +
            " does not exist.";

        return;
    }

    clearGraphHighlights();

    let visited =
        new Set();

    let traversalResult = [];

    document.getElementById("graphStatus").innerText =
        "🔍 DFS started from node " +
        startNode;

    await dfsVisit(
        startNode,
        visited,
        traversalResult
    );

    document.getElementById("graphStatus").innerText =
        "✅ DFS Traversal: " +
        traversalResult.join(" → ");
        updateProgress("graphs", "dfs");
}

async function dfsVisit(
    node,
    visited,
    traversalResult
) {

    visited.add(node);

    traversalResult.push(node);

    highlightGraphNode(node);

    document.getElementById("graphStatus").innerText =
        "🔍 DFS → Visiting node " +
        node;

    await sleep(700);

    for (
        let neighbor of graph[node]
    ) {

        if (!visited.has(neighbor)) {

            await dfsVisit(
                neighbor,
                visited,
                traversalResult
            );
        }
    }
}

function highlightGraphNode(value) {

    let nodes =
        document.querySelectorAll(
            ".graph-node"
        );

    nodes.forEach(node => {

        node.classList.remove(
            "graph-searching"
        );

        if (
            Number(node.innerText) ===
            value
        ) {

            node.classList.add(
                "graph-searching"
            );
        }
    });
}

function clearGraphHighlights() {

    let nodes =
        document.querySelectorAll(
            ".graph-node"
        );

    nodes.forEach(node => {

        node.classList.remove(
            "graph-searching"
        );
    });
}

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    let button = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {

        button.innerText = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    } else {

        button.innerText = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");
    }
}

window.addEventListener("DOMContentLoaded", function () {

    let savedTheme = localStorage.getItem("theme");

    let button = document.getElementById("themeToggle");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (button) {
            button.innerText = "☀️ Light Mode";
        }
    }
});

const algorithmInfo = {

    bubble: {
        title: "Bubble Sort",
        description:
            "Repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)"
    },

    selection: {
        title: "Selection Sort",
        description:
            "Finds the minimum element and places it at the correct position.",
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)"
    },

    insertion: {
        title: "Insertion Sort",
        description:
            "Builds the sorted array one element at a time by inserting each element into its correct position.",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)"
    },

    merge: {
        title: "Merge Sort",
        description:
            "Divides the array into smaller parts, sorts them, and merges the sorted parts.",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)"
    },

    quick: {
        title: "Quick Sort",
        description:
            "Selects a pivot and partitions the array around the pivot.",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
        space: "O(log n)"
    },

    linear: {
        title: "Linear Search",
        description:
            "Checks each element one by one until the required value is found.",
        best: "O(1)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(1)"
    },

    binary: {
        title: "Binary Search",
        description:
            "Repeatedly divides a sorted array into two halves to find the target value.",
        best: "O(1)",
        average: "O(log n)",
        worst: "O(log n)",
        space: "O(1)"
    }
};


function updateAlgorithmInfo() {

    let algorithm =
        document.getElementById("algorithm").value;

    let info = algorithmInfo[algorithm];

    if (!info) return;

    document.getElementById("algorithm-title").innerText =
        info.title;

    document.getElementById("algorithm-description").innerText =
        info.description;

    document.getElementById("best").innerText =
        info.best;

    document.getElementById("average").innerText =
        info.average;

    document.getElementById("worst").innerText =
        info.worst;

    document.getElementById("space").innerText =
        info.space;
}

let algorithmSelect =
    document.getElementById("algorithm");

if (algorithmSelect) {

    algorithmSelect.addEventListener(
        "change",
        updateAlgorithmInfo
    );

}

window.addEventListener(
    "DOMContentLoaded",
    updateAlgorithmInfo
);


async function checkLogin() {
    const client = window.supabaseClient;

    if (!client) {
        console.error("Supabase client is not loaded.");
        window.location.href = "login.html";
        return;
    }

    const { data: { session }, error } =
        await client.auth.getSession();

    if (error || !session) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("dsaUser");
        window.location.href = "login.html";
        return;
    }

    const user = session.user;

    const userName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User";

    const userInfo = {
        id: user.id,
        name: userName,
        email: user.email
    };

    localStorage.setItem("dsaUser", JSON.stringify(userInfo));
    localStorage.setItem("isLoggedIn", "true");

    const userWelcome = document.getElementById("userWelcome");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    if (userWelcome) userWelcome.innerText = userName;
    if (profileName) profileName.innerText = userName;
    if (profileEmail) profileEmail.innerText = user.email || "";
}



async function logoutUser() {
    if (window.supabaseClient) {
        const { error } = await window.supabaseClient.auth.signOut();

        if (error) {
            console.error("Logout failed:", error.message);
            alert("Could not log out. Please try again.");
            return;
        }
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("dsaUser");
    localStorage.removeItem("dsaProgress");
    localStorage.removeItem("dsaCompleted");

    window.location.href = "login.html";
}


function toggleProfileMenu() {

    let dropdown =
        document.getElementById("profileDropdown");

    dropdown.classList.toggle("show");
}

let progressSaveQueue = Promise.resolve();

function updateProgress(topic, activity) {
    progressSaveQueue = progressSaveQueue
        .then(async () => {
            const client = window.supabaseClient;

            if (!client) {
                console.error("Supabase client is not loaded.");
                return;
            }

            const {
                data: { session },
                error: sessionError
            } = await client.auth.getSession();

            if (sessionError || !session) {
                console.warn("Please log in to save progress.");
                return;
            }

            const userId = session.user.id;

            const { data: savedData, error: loadError } = await client
                .from("user_progress")
                .select("progress, completed")
                .eq("user_id", userId)
                .maybeSingle();

            if (loadError) {
                console.error("Could not load progress:", loadError.message);
                return;
            }

            const progress = savedData?.progress || {
                sorting: 0,
                searching: 0,
                dataStructures: 0,
                graphs: 0
            };

            const completed = savedData?.completed || {};

            if (completed.graph && !completed.graphs) {
                completed.graphs = completed.graph;
            }
            delete completed.graph;

            if (progress.graph !== undefined && progress.graphs === undefined) {
                progress.graphs = progress.graph;
            }
            delete progress.graph;

            if (topic === "graph") {
                topic = "graphs";
            }

            if (!Array.isArray(completed[topic])) {
                completed[topic] = [];
            }

            if (completed[topic].includes(activity)) {
                localStorage.setItem("dsaProgress", JSON.stringify(progress));
                localStorage.setItem("dsaCompleted", JSON.stringify(completed));
                return;
            }

            completed[topic].push(activity);

            if (topic === "sorting") {
                progress.sorting = Math.min(completed.sorting.length * 20, 100);
            } else if (topic === "searching") {
                progress.searching = Math.min(completed.searching.length * 50, 100);
            } else if (topic === "dataStructures") {
                const activities = completed.dataStructures;

                const structures = [
                    activities.some(item => item.startsWith("stack_")),
                    activities.some(item => item.startsWith("queue_")),
                    activities.some(item => item.includes("linkedlist")),
                    activities.some(item => item.startsWith("bst"))
                ];

                progress.dataStructures =
                    structures.filter(Boolean).length * 25;
            } else if (topic === "graphs") {
                progress.graphs = Math.min(completed.graphs.length * 50, 100);
            }

            localStorage.setItem("dsaProgress", JSON.stringify(progress));
            localStorage.setItem("dsaCompleted", JSON.stringify(completed));

            const { error: saveError } = await client
                .from("user_progress")
                .upsert({
                    user_id: userId,
                    progress,
                    completed,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: "user_id"
                });

            if (saveError) {
                console.error("Could not save progress:", saveError.message);
            } else {
                console.log("Progress saved to Supabase.");
            }
        })
        .catch(error => {
            console.error("Progress tracking failed:", error);
        });

    return progressSaveQueue;
}