const items = document.querySelectorAll('.item');
const itemsArray = Array.from(items);
let draggedItem = null;

itemsArray.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    setTimeout(() => {
      item.classList.add('dragging');
    })
    draggedItem = item;
  });

  item.addEventListener('dragenter', (e) => {
    if (draggedItem === e.target) return;
    const allItems = Array.from(document.querySelectorAll('.item'));
    const firstRects = allItems.map(item => item.getBoundingClientRect());


    const parent = draggedItem.parentNode;
    const index = Array.from(e.target.parentNode.children).indexOf(e.target);
    const sourceIndex = Array.from(parent.children).indexOf(draggedItem);
    const sibling = draggedItem.nextSibling;
    if (index === 0) {
      e.target.parentNode.insertBefore(draggedItem, e.target.nextSibling);
    } else if (index === 1) {
      e.target.parentNode.insertBefore(draggedItem, e.target);
    }
    if (sourceIndex === 0) {
      parent.insertBefore(e.target, sibling);
    } else if (sourceIndex === 1) {
      parent.appendChild(e.target);
    }


    const lastRects = allItems.map(item => item.getBoundingClientRect());

    allItems.forEach((item, index) => {
      const deltaX = firstRects[index].left - lastRects[index].left;
      const deltaY = firstRects[index].top - lastRects[index].top;

      if (deltaX !== 0 || deltaY !== 0) {
        item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        item.style.transition = 'transform 0s';
      }
    });

    requestAnimationFrame(() => {
      allItems.forEach((item) => {
        item.style.transition = 'transform 300ms ease';
        item.style.transform = 'translate(0, 0)';
      });
    });
  });

  item.addEventListener('dragend', (e) => {
    e.preventDefault();
    draggedItem = null;
    item.classList.remove('dragging');
  });

  item.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

})


console.log('%c hello', 'color:#055279;background:#6cf', {a: 1, b: {c: { d: 1}}});