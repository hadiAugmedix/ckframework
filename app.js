import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';


import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/pencil.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class AutoCorrection extends Plugin {
    init() {
        console.log(this);

        const editor = this.editor;

        editor.editing.view.document.on('keydown', (evt, data) => {
            console.log('Keydown event trigger');
        });

        editor.model.document.on('change', () => {
            console.log('The Document has changed!');
        });

        editor.keystrokes.set('Ctrl+S', (data, stop) => {
            console.log(data);
            stop();
        }); 

        editor.keystrokes.set( 'Ctrl+B', 'bold' );

        setTimeout(() => {
            console.log(editor.getData());
        }, 2000);

        this.addButton();
    }

    addButton() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'autoCorrection', locale => {
            const view = new ButtonView( locale );

            view.set({ label: 'Auto correction', icon: imageIcon, tooltip: true });

            view.on('execute', () => {
                editor.model.change(writer => {
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText( 'test', insertPosition );
                });
            });

            return view;
        });
    }
}



ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Bold, Italic, ListPlugin, AutoCorrection ],
        toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', 'undo', 'redo', 'autoCorrection' ]
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );
