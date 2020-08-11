import { elements } from './base';

export const renderTextQuestion = question => {
    const markup = `
    <form class="form">
        <label>What got borrowed?</label><br>
        <input type="text" id="fname" name="fname"><br><br>
  </form>
    `;
    elements.addItem.insertAdjacentHTML('beforeend', markup);
}