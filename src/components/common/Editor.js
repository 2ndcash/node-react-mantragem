import React, { useState, useEffect, useRef } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js';

const ControlledEditor = (props) => {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const { Editor, draftToHtml, htmlToDraft } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            Editor: require('react-draft-wysiwyg').Editor,
            draftToHtml: require('draftjs-to-html'),
            htmlToDraft: require('html-to-draftjs').default
        }
        setEditorLoaded(true)
    }, [])

    useEffect(() => {
        if (htmlToDraft) {
            const html = props.defaultVal || ''; //'<p>Hey this <strong>editor</strong> rocks 😀</p>';
            const contentBlock = htmlToDraft(convertImages(html));
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const _editorState = EditorState.createWithContent(contentState);
            setEditorState(_editorState)
        }
    }, [htmlToDraft])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(rawContentState, {
            // trigger: '#',
            // separator: ' ',
        }, true, (entity, text) => {
            if (entity.type === 'IMAGE') {
                const data = entity.data;
                const alignment = data.alignment || 'none';
                const textAlign = alignment === 'none' ? 'center' : alignment;

                // return `<p style="text-align:${textAlign};">
                //     <img src="${data.src}" alt="${data.alt}" style="height: ${data.height};width: ${data.width}"/>
                // </p>`;
                return `<p style="text-align:${textAlign};">
                    <img src="${data.src}" alt="${data.alt}" style="height: 100%;width: 100%;"/>
                </p>`;
            }
            else if (entity.type === 'EMBEDDED_LINK') {
                const data = entity.data;

                return `<div class="wrapper-box-img"><div class="box-img-correct">
                    <iframe width="${data.width}" height="${data.height}" src="${data.src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div></div>`
            }
        })

        let htmlConverted = convertImages(markup);

        // console.log(rawContentState)
        // const markup = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        props.setValue(props.name, htmlConverted)
    }

    const convertImages = (htmlText) => {
        const regex = /<img\s[^>]*?style\s*=\s*['\"]float([^'\"]*?)['\"][^>]*?>/g;
        let m;
        while ((m = regex.exec(htmlText)) !== null) {
            if (m.index === regex.lastIndex) regex.lastIndex++;
            let repl = null, type = null;
            m.forEach((match, groupIndex) => {
                if (groupIndex == 0) repl = match;
                if (groupIndex == 1) type = match;
                if (repl && type) {
                    if (type.includes('none')) htmlText = htmlText.replace(repl, `<div style="text-align: center;width: 100%;">` + repl + '</div>');
                    else htmlText = htmlText.replace(repl, `<div style="text-align ${type}; width: 100%;">` + repl + '</div>');
                    repl = null;
                    type = null;
                }
            });
        }
        return htmlText;
    }

    const getFileBase64 = (file, callback) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        // Since FileReader is asynchronous,
        // we need to pass data back.
        reader.onload = () => callback(reader.result);
        // TODO: catch an error
        reader.onerror = error => { };
    };

    const imageUploadCallback = file => new Promise(
        (resolve, reject) => getFileBase64(
            file,
            data => resolve({ data: { link: data } })
        )
    );

    return editorLoaded ? (
        <Editor
            editorState={editorState}
            // wrapperClassName="demo-wrapper"
            // editorClassName="demo-editor"
            toolbarClassName="demo-toolbar-absolute"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
            // toolbarOnFocus
            toolbar={{
                // options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link']
                // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                    uploadCallback: imageUploadCallback,
                    previewImage: true,
                    defaultSize: {
                        height: '100%',
                        width: '100%',
                    },
                },
                embedded: {
                    defaultSize: {
                        height: '100%',
                        width: '100%',
                    },
                }
            }}
        />) : (
            <div>Editor loading</div>
        )
}

export default ControlledEditor