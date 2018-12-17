# AF-SCAFFOLDER v2 - Changelog

 All relevant modifications to the `af-scaffolder` will be documented in this file following the one specified in [KEEP CHANGELOG](http://keepachangelog.com/).

## 2.0.0 - 2018-12-17

## Changed
- We've changed the strength of working with template arguments. Before there were the props:
```javascript
{{app_capitalize}}
{{app_lower_case}}
{{app_upper_case}}
```
This model was bad, for two main reasons. 1. Extreme sensitivity to maintain existing props. Affecting the template directly. 2. Whenever a new need arises a new prop needs to be implemented.
Now the app name is available in the context of the template as: pack_name. You decide how to format:
```javascript
{{pack_name}}
{{lowercase pack_name}}
{{uppercase pack_name}}
{{capitalize pack_name}}
```

## Added
- With the new way of formatting and modifying the template data, we added a help kit for string and predefined date values.

### String Helpers:
- lowercase;
- uppercase;
- capitalize;
- pluralize_pt;
- singulate_pt;

## Added
- We implemented array support. Both in the Templates and in the arguments of the command line.

### Command Line:
```bash
af-scaffolder -s ../schema-module.json -n Sample -a fields:field1,field2,field3,field4
```

Results in...
```json
{
  fields: [
    'field1',
    'field2',
    'field3',
    'field4',
  ]
}
```
...at template context.

#### Multiple arguments as arrays
If you need multiple arrays at template context, dont worry about that:
```bash
af-scaffolder -s ../schema-module.json -n Sample -a fields:field1,field2,field3,field4 -a sidebar:menu1,menu2,menu3
```
Results in...
```json
{
  fields: [
    'field1',
    'field2',
    'field3',
    'field4',
  ],
  sidebar: [
    'menu1',
    'menu2',
    'menu3',
  ]
}
```

### Templates:
How to use the parsed array at template:
```javascript
    {{#each fields}}
      {
        data: {{singulate_pt (lowercase this)}}, 
        title: {{pluralize_pt (capitalize this)}}, 
      },
    {{/each}}
```
