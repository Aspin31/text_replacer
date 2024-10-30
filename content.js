document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'Control') {
        const activeElement = document.activeElement;

        // Проверяем текстовые области и элементы, где может быть ввод текста
        let textToReplace = '';
        if (activeElement.tagName === 'TEXTAREA') {
            textToReplace = activeElement.value;
        } else if (activeElement.tagName === 'INPUT' && activeElement.type === 'text') {
            textToReplace = activeElement.value;
        } else if (activeElement.isContentEditable) {
            // Для редактируемых содержимых (например, в Gmail)
            textToReplace = activeElement.innerText;
        }

        // Если нашли текст, производим замену
        if (textToReplace.includes('зд')) {
            const newText = textToReplace.replace(/зд/g, 'Здравствуйте, сделано.');
            
            if (activeElement.tagName === 'TEXTAREA') {
                activeElement.value = newText;
                activeElement.setSelectionRange(newText.length, newText.length);
            } else if (activeElement.tagName === 'INPUT' && activeElement.type === 'text') {
                activeElement.value = newText;
                activeElement.setSelectionRange(newText.length, newText.length);
            } else if (activeElement.isContentEditable) {
                // Обновляем innerText для редактируемого контента
                activeElement.innerText = newText;
                // Ставим курсор в конец текста
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(activeElement);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }
});
