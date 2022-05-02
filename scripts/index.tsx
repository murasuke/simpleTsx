import $ from 'jquery';
import h from './lib/libtsx';

$(() => {
  $('#app').append(
    <div style={{ backgroundColor: '#ccf' }}>
      <h2>tsx sample</h2>
      <div id="div1" className="classname1">
        <input type="text" id="text1" value="text1" />
        <button onclick={() => alert($('#text1').val())}>
          show textbox value
        </button>
      </div>
      <a href="https://npm.im/hyperscript" target="_blank">
        open hyperscript page
      </a>
    </div>,
  );
});
