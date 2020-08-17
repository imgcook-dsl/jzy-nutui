class DependencePackage{
  constructor(name, version) {
    this.package = name;
    this.version = version;
  }
}

module.exports = function(schema, option) {
  const {_, prettier} = option;

  // template
  const template = [];

  // imports
  const imports = [];
  var imports4panel = [];

  // Global Public Functions
  const utils = [];

  // data
  const datas = [];

  const constants = {};

  // methods
  const methods = [];

  const expressionName = [];

  // lifeCycles
  const lifeCycles = [];

  // styles
  const styles = [];

  const styles4vw = [];

  // box relative style
  const boxStyleList = ['fontSize', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'height', 'top', 'bottom', 'width', 'maxWidth', 'left', 'right', 'paddingRight', 'paddingLeft', 'marginLeft', 'marginRight', 'lineHeight', 'borderBottomRightRadius', 'borderBottomLeftRadius', 'borderTopRightRadius', 'borderTopLeftRadius', 'borderRadius'];

  // no unit style
  const noUnitStyles = ['opacity', 'fontWeight'];

  const lifeCycleMap = {
    '_constructor': 'created',
    'getDerivedStateFromProps': 'beforeUpdate',
    'render': '',
    'componentDidMount': 'mounted',
    'componentDidUpdate': 'updated',
    'componentWillUnmount': 'beforeDestroy'
  }

  const width = option.responsive.width || 750;
  const viewportWidth = option.responsive.viewportWidth || 375;

  // 1vw = width / 100
  const _w = ( width / 100);

  const _ratio = width / viewportWidth;

  // for nut ui
  var _nut_component_index = 0;

  const componentsMap = option.componentsMap;
  const components = [];

  const importComponent = (type) => {
    let result = '';

    if (!componentsMap || !componentsMap.list) {
      return result;
    }

    if (componentsMap && !components.includes(type)) {
      const componentMap = componentsMap.list.filter(com => com.name === type)[0];

      if (componentMap) {
        const pkgName = componentMap.package ? componentMap.package : '@alifd/next';

        if (componentMap.exportName) {
          
          let exportName = componentMap.dependence.destructuring ? `{ ${componentMap.exportName} }` : componentMap.exportName;
          result = componentMap.main
            ? `import ${exportName} from '${pkgName}${componentMap.main}';\n`
            : `import ${exportName} from '${pkgName}';\n`;
          
          let dp = new DependencePackage(pkgName, componentMap.dependenceVersion)
          let bExist = false;
          imports4panel.forEach(element => {
            if (element.package === pkgName){
              bExist = true;
              result;
            }
          });
          if (!bExist){
            imports4panel.push(dp);
          }     

          result += `${componentMap.exportName}.install(Vue);`;
        }

        components.push(componentMap.name);
      } else {
        // not find in componentsMap
        result = `import {${type}} from '@alifd/next'`;
        components.push(type);
      }      
    }

    return result;
  };

  const isExpression = (value) => {
    return /^\{\{.*\}\}$/.test(value);
  }

  const transformEventName = (name) => {
    return name.replace('on', '').toLowerCase();
  }

  const toString = (value) => {
    if ({}.toString.call(value) === '[object Function]') {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        } else {
          return value;
        }
      })
    }

    return String(value);
  };

  // convert to responsive unit, such as vw
  const parseStyle = (style, toVW) => {
    const styleData = [];
    for (let key in style) {
      let value = style[key];
      if (boxStyleList.indexOf(key) != -1) {
        if (toVW) {
          value = (parseInt(value) / _w).toFixed(2);
          value = value == 0 ? value : value + 'vw';
        } else {
          value = (parseInt(value)).toFixed(2);
          value = value == 0 ? value : value + 'px';
        }
        styleData.push(`${_.kebabCase(key)}: ${value}`);
      } else if (noUnitStyles.indexOf(key) != -1) {
        styleData.push(`${_.kebabCase(key)}: ${parseFloat(value)}`);
      } else {
        styleData.push(`${_.kebabCase(key)}: ${value}`);
      }
    }
    return styleData.join(';');
  }

  // parse function, return params and content
  const parseFunction = (func) => {
    const funcString = func.toString();
    const name = funcString.slice(funcString.indexOf('function'), funcString.indexOf('(')).replace('function ','');
    const params = funcString.match(/\([^\(\)]*\)/)[0].slice(1, -1);
    const content = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
    return {
      params,
      content,
      name
    };
  }

  // parse layer props(static values or expression)
  const parseProps = (value, isReactNode, constantName) => {
    if (typeof value === 'string') {
      if (isExpression(value)) {
        if (isReactNode) {
          return `{{${value.slice(7, -2)}}}`;
        } else {
          return value.slice(2, -2);
        }
      }

      if (isReactNode) {
        return value;
      } else if (constantName) { // save to constant
        expressionName[constantName] = expressionName[constantName] ? expressionName[constantName] + 1 : 1;
        const name = `${constantName}${expressionName[constantName]}`;
        constants[name] = value;
        return `"constants.${name}"`;
      } else {
        return `"${value}"`;
      }
    } else if (typeof value === 'function') {
      const {params, content, name} = parseFunction(value);
      expressionName[name] = expressionName[name] ? expressionName[name] + 1 : 1;
      methods.push(`${name}_${expressionName[name]}(${params}) {${content}}`);
      return `${name}_${expressionName[name]}`;
    } else {
      return `${value}`;
    }
  }

  const parsePropsKey = (key, value) => {
    if (typeof value === 'function') {
      return `@${transformEventName(key)}`;
    } else {
      return `:${key}`;
    }
  } 

  // parse async dataSource
  const parseDataSource = (data) => {
    const name = data.id;
    const {uri, method, params} = data.options;
    const action = data.type;
    let payload = {};

    switch (action) {
      case 'fetch':
        if (imports.indexOf(`import {fetch} from whatwg-fetch`) === -1) {
          imports.push(`import {fetch} from 'whatwg-fetch'`);
        }
        payload = {
          method: method
        };

        break;
      case 'jsonp':
        if (imports.indexOf(`import {fetchJsonp} from fetch-jsonp`) === -1) {
          imports.push(`import jsonp from 'fetch-jsonp'`);
        }
        break;
    }

    Object.keys(data.options).forEach((key) => {
      if (['uri', 'method', 'params'].indexOf(key) === -1) {
        payload[key] = toString(data.options[key]);
      }
    });

    // params parse should in string template
    if (params) {
      payload = `${toString(payload).slice(0, -1)} ,body: ${isExpression(params) ? parseProps(params) : toString(params)}}`;
    } else {
      payload = toString(payload);
    }

    let result = `{
      ${action}(${parseProps(uri)}, ${toString(payload)})
        .then((response) => response.json())
    `;

    if (data.dataHandler) {
      const { params, content } = parseFunction(data.dataHandler);
      result += `.then((${params}) => {${content}})
        .catch((e) => {
          console.log('error', e);
        })
      `
    }

    result += '}';

    return `${name}() ${result}`;
  }

  // parse condition: whether render the layer
  const parseCondition = (condition, render) => {
    let _condition = isExpression(condition) ? condition.slice(2, -2) : condition;
    if (typeof _condition === 'string') {
      _condition = _condition.replace('this.', '');
    }
    render = render.replace(/^<\w+\s/, `${render.match(/^<\w+\s/)[0]} v-if="${_condition}" `);
    return render;
  }

  // parse loop render
  const parseLoop = (loop, loopArg, render) => {
    let data;
    let loopArgItem = (loopArg && loopArg[0]) || 'item';
    let loopArgIndex = (loopArg && loopArg[1]) || 'index';

    if (Array.isArray(loop)) {
      data = 'loopData';
      datas.push(`${data}: ${toString(loop)}`);
    } else if (isExpression(loop)) {
      data = loop.slice(2, -2).replace('this.state.', '');
    }
    // add loop key
    const tagEnd = render.indexOf('>');
    const keyProp = render.slice(0, tagEnd).indexOf('key=') == -1 ? `:key="${loopArgIndex}"` : '';
    render = `
      ${render.slice(0, tagEnd)}
      v-for="(${loopArgItem}, ${loopArgIndex}) in ${data}"  
      ${keyProp}
      ${render.slice(tagEnd)}`;

    // remove `this` 
    const re = new RegExp(`this.${loopArgItem}`, 'g')
    render = render.replace(re, loopArgItem);

    return render;
  }

  // delete other prop of nutui componnet
  const SepialDeal4NutUi = (type, originStyle)=>{
    if (type.indexOf("nut-tab") == 0){
      var tempList = [];
      for (prop in originStyle) {
        if(prop != 'width' && prop != 'height' && prop.indexOf('margin-') != 0){
          tempList.push(prop);
        }
      }

      tempList.forEach(item=>{
        delete originStyle[item];
      })
    }
  }

  // generate render xml
  const generateRender = (schema) => {
    const type = schema.componentName.toLowerCase();
    const className = schema.props && schema.props.className;
    const classString = className ? ` class="${className}"` : '';

    SepialDeal4NutUi(type, schema.props.style);

    if (className) {
      styles.push(`
        .${className} {
          ${parseStyle(schema.props.style)}
        }
      `);
      styles4vw.push(`
        .${className} {
          ${parseStyle(schema.props.style, true)}
        }
      `);
    }

    let xml;
    let props = '';

    
    var nutVars = new Map();
    var componentDataRoot = '';
    Object.keys(schema.props).forEach((key) => {
      if (['className', 'style', 'text', 'src'].indexOf(key) === -1) {
        var propName = `${parsePropsKey(key, schema.props[key])}`;
        if (type.indexOf("nut-") == 0){          
          if (nutVars.size == 0){
            componentDataRoot = `${type}_${++_nut_component_index}`.replace(/-/g,'_');   
          }

          var varName = `${propName.substr(1, propName.length)}`.replace(/-/g,'_');
          nutVars.set(varName, parseProps(schema.props[key]));
          props += ` ${propName}="${componentDataRoot}.${varName}"`;
        }else{
          props += ` ${propName}=${parseProps(schema.props[key])}`; 
        }           
      }
    });

    if (nutVars.size > 0){   
      var componentDataValue = "";
      nutVars.forEach(function(value,key){
        componentDataValue = `${componentDataValue}${key}: ${value},\n`;
      });

      datas.push(`${componentDataRoot}: {\n ${componentDataValue}\n}`);
    }

    switch(type) {
      case 'text':
        const innerText = parseProps(schema.props.text, true);
        xml = `<span${classString}${props}>${innerText}</span> `;
        break;
      case 'image':
        let source = parseProps(schema.props.src, false);
        if (!source.match('"')) {
          source = `"${source}"`;
          xml = `<img${classString}${props} :src=${source} /> `;
        } else {
          xml = `<img${classString}${props} src=${source} /> `;
        }
        break;
      case 'div':
      case 'page':
      case 'block':
      case 'component':
        if (schema.children && schema.children.length) {
          xml = `<div${classString}${props}>${transform(schema.children)}</div>`;
        } else {
          xml = `<div${classString}${props} />`;
        }
        break;
      default:
        if (schema.children && schema.children.length) {
          xml = `<${type}${classString}${props}>${transform(schema.children)}</${type}>`;
        } else {
          xml = `<${type}${classString}${props} />`;
        }

        const importString = importComponent(type);

        if (importString) {
          imports.push(importString);
        }
        break;
    }

    if (schema.loop) {
      xml = parseLoop(schema.loop, schema.loopArgs, xml)
    }
    if (schema.condition) {
      xml = parseCondition(schema.condition, xml);
      // console.log(xml);
    }
    return xml || '';
  }

  // parse schema
  const transform = (schema) => {
    let result = '';

    if (Array.isArray(schema)) {
      schema.forEach((layer) => {
        result += transform(layer);
      });
    } else {
      const type = schema.componentName.toLowerCase();

      if (['page', 'block', 'component'].indexOf(type) !== -1) {
        // 容器组件处理: state/method/dataSource/lifeCycle/render
        const init = [];

        if (schema.state) {
          datas.push(`${toString(schema.state).slice(1, -1)}`);
        }

        if (schema.methods) {
          Object.keys(schema.methods).forEach((name) => {
            const { params, content } = parseFunction(schema.methods[name]);
            methods.push(`${name}(${params}) {${content}}`);
          });
        }

        if (schema.dataSource && Array.isArray(schema.dataSource.list)) {
          schema.dataSource.list.forEach((item) => {
            if (typeof item.isInit === 'boolean' && item.isInit) {
              init.push(`this.${item.id}();`)
            } else if (typeof item.isInit === 'string') {
              init.push(`if (${parseProps(item.isInit)}) { this.${item.id}(); }`)
            }
            methods.push(parseDataSource(item));
          });

          if (schema.dataSource.dataHandler) {
            const { params, content } = parseFunction(schema.dataSource.dataHandler);
            methods.push(`dataHandler(${params}) {${content}}`);
            init.push(`this.dataHandler()`);
          }
        }

        if (schema.lifeCycles) {
          if (!schema.lifeCycles['_constructor']) {
            lifeCycles.push(`${lifeCycleMap['_constructor']}() { ${init.join('\n')}}`);
          }

          Object.keys(schema.lifeCycles).forEach((name) => {
            const vueLifeCircleName = lifeCycleMap[name] || name;
            const { params, content } = parseFunction(schema.lifeCycles[name]);

            if (name === '_constructor') {
              lifeCycles.push(`${vueLifeCircleName}() {${content} ${init.join('\n')}}`);
            } else {
              lifeCycles.push(`${vueLifeCircleName}() {${content}}`);
            }
          });
        }
        template.push(generateRender(schema));

      } else {
        result += generateRender(schema);
      }
    }
    return result;
  };

  if (option.utils) {
    Object.keys(option.utils).forEach((name) => {
      utils.push(`const ${name} = ${option.utils[name]}`);
    });
  }

  // start parse schema
  transform(schema);
  datas.push(`constants: ${toString(constants)}`);

  const prettierOpt = {
    parser: 'vue',
    printWidth: 80,
    singleQuote: true
  };

  return {
    panelDisplay: [
      {
        panelName: `index.vue`,
        panelValue: prettier.format(`
          <template>
              ${template}
          </template>
          <script>
            import Vue from "vue";
            ${imports.join('\n')}

            export default {
              data() {
                return {
                  ${datas.join(',\n')}
                } 
              },
              methods: {
                ${methods.join(',\n')}
              },
              ${lifeCycles.join(',\n')}
            }
          </script>
          <style scoped>
            @import "./index.response.css";
            /* 如下给出两个覆盖样式的示例，实际根据自己需求来*/
            /deep/.nut-tab{
              border:0!important;
              padding:0!important;
              background:#FF000000!important;
            }
            /deep/.nut-button{
              background:linear-gradient(315deg,#d2977f,#d2977f)!important;
            }
          </style>
        `, prettierOpt),
        panelType: 'vue',
        panelImports: JSON.stringify(imports4panel)
      },
      {
        panelName: 'index.css',
        panelValue: prettier.format(`${styles.join('\n')}`, {parser: 'css'}),
        panelType: 'css'
      },
      {
        panelName: 'index.response.css',
        panelValue: prettier.format(styles4vw.join('\n'), {parser: 'css'}),
        panelType: 'css'
      }
    ],
    renderData: {
      template: template,
      imports: imports,
      datas: datas,
      methods: methods,
      lifeCycles: lifeCycles,
      styles: styles

    },
    noTemplate: true
  };
}
