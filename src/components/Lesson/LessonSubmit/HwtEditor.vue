<template>
  <div class="hwt-editor">
    <el-upload
      id="upload-trigger"
      action="http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload"
      :on-success="handleUploadSuccess"
      :drag="hwtSubmitDragStatus"
      multiple
    >
      <div v-if="hwtSubmitDragStatus">
        <el-icon class="el-icon--upload">
          <svg
            t="1647834161622"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="20761"
            width="200"
            height="200"
          >
            <path
              d="M384 682.666667v-256H213.333333l298.666667-298.666667 298.666667 298.666667h-170.666667v256H384m-170.666667 170.666666v-85.333333h597.333334v85.333333H213.333333z"
              fill=""
              p-id="20762"
            ></path>
          </svg>
        </el-icon>
        <div class="el-upload__text">
          拖拽文件到此处或 <em>点击上传附件</em>
        </div>
      </div>
    </el-upload>

    <Toolbar
      id="toolbar-container"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="simple"
    />
    <Editor
      id="editor-container"
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="simple"
      @onCreated="handleCreated"
    />
    <!-- 此处须为行内样式，否则编辑器只有有内容的行可以点击 -->
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { Boot } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

import sendRequest from "@/request/SendRequest";
import ConfigOperations from "@/hooks/Config/ConfigOperations";

const props = defineProps({
  propHwtContent: {
    type: Object,
    required: true,
  },
});

const hwtSubmitDragStatus = ref(
  ConfigOperations.readUserConfig()["config-hwt-submit-drag"].value
);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

// 当父组件传递的提交内容更新 将内容更新到编辑器
watch(
  () => props.propHwtContent,
  (val) => {
    editorRef.value.clear();
    editorRef.value.dangerouslyInsertHtml(val.hwaAnswer);
  }
);

// 自定义菜单配置
class ButtonMenuClass {
  title = "上传附件";
  iconSvg = `<svg t="1647484105757" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30375" width="200" height="200"><path d="M950.877407 878.109433H73.406289a72.980745 72.980745 0 0 0 0 145.890567H950.877407a72.980745 72.980745 0 0 0 0-145.890567zM170.713949 439.728494h158.727802v296.249342a69.079928 69.079928 0 0 0 69.009004 69.079928h227.949577a69.079928 69.079928 0 0 0 69.150852-69.009004V439.728494h158.656878a35.036432 35.036432 0 0 0 25.745394-58.725031L538.100014 11.205984a35.461975 35.461975 0 0 0-51.490788 0L145.110403 381.003463A35.036432 35.036432 0 0 0 170.713949 439.728494z" fill="#707070" p-id="30376"></path></svg>`;
  tag = "button";
  getValue() {}
  isActive() {
    return false;
  }
  isDisabled() {
    return false;
  }
  exec(editor, value) {
    document.querySelector("#upload-trigger input").click();
  }
}

const buttonMenu = {
  key: "attachment",
  factory() {
    return new ButtonMenuClass();
  },
};

try {
  // 可能已经注册过attachment
  Boot.registerMenu(buttonMenu);
} catch {}

const toolbarConfig = {
  excludeKeys: [
    "blockquote",
    "insertTable",
    "codeBlock",
    "fullScreen",
    "emotion",
    "lineHeight",
    "todo",
    "group-indent",
  ],
  insertKeys: {
    index: 26,
    keys: ["attachment"],
  },
};
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      async customUpload(file, insertFn) {
        let formData = new FormData();
        formData.append("Filename", file.name);
        formData.append("Filedata", file);
        sendRequest(
          `http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload`,
          undefined,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => {
          if (res.ok === true) {
            res.text().then((resURL) => {
              insertFn("/meol/" + resURL);
            });
          }
        });
      },
    },
    uploadVideo: {
      async customUpload(file, insertFn) {
        let formData = new FormData();
        formData.append("Filename", file.name);
        formData.append("Filedata", file);
        sendRequest(
          `http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload`,
          undefined,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => {
          if (res.ok === true) {
            res.text().then((resURL) => {
              insertFn("/meol/" + resURL);
            });
          }
        });
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  window.editor = editor;
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleUploadSuccess = (response, file, fileList) => {
  const innerNode = {
    type: "link",
    url: `/meol/${response}" href="/meol/${response}`,
    children: [{ text: file.name }],
  };
  const outerNode = {
    type: "paragraph",
    children: [innerNode],
  };
  // 增加非空判断避免插入空行
  if (editorRef.value.isEmpty()) {
    editorRef.value.insertNode(innerNode);
  } else {
    editorRef.value.insertNode(outerNode);
  }
  setTimeout(() => {
    // 上传成功后1.5秒清空上传文件列表
    fileList.forEach((item, index) => {
      if (item.name === file.name) {
        fileList.splice(index, 1);
      }
    });
  }, 1500);
};
</script>

<style>
#upload-trigger {
  text-align: center;
  padding: 10px;
}
#upload-trigger .el-upload {
  width: 100%;
}
#upload-trigger .el-upload .el-upload-dragger {
  width: 100%;
}
#toolbar-container {
  border: 1px solid #ccc;
}
#editor-container {
  border: 1px solid #ccc;
  border-style: none solid solid solid;
}
</style>
