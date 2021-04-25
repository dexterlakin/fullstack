(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t(14),a=t.n(c),o=(t(19),t(3)),s=t(4),i=t.n(s),u="/api/persons",d={getAll:function(){return i.a.get(u).then((function(e){return e.data}))},create:function(e){return i.a.post(u,e).then((function(e){return e.data}))},update:function(e,n){return i.a.put("".concat(u,"/").concat(e),n).then((function(e){return e.data}))},deletePerson:function(e){return i.a.delete("".concat(u,"/").concat(e)).then((function(e){return e.data}))}},l=t(0),j=function(e){return Object(l.jsx)("div",{children:Object(l.jsx)("form",{children:Object(l.jsx)("input",{value:e.searchTerm,onChange:e.handleSearch})})})},h=function(e){return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:e.addPerson,children:[Object(l.jsxs)("div",{children:["name: ",Object(l.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(l.jsxs)("div",{children:["number: ",Object(l.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]})})},b=function(e){var n=e.props,t=e.person;return Object(l.jsx)("div",{children:Object(l.jsxs)("p",{children:[t.name," ",t.number," ",Object(l.jsx)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(t.name," ?"))&&d.deletePerson(t.id).then((function(n){e.setPersons(e.persons.filter((function(n){return n.id!==e.id}))),console.log("deleted ".concat(t.name)),d.getAll().then((function(n){e.setPersons(n)}))})).catch((function(n){e.setNotificationMessage("".concat(t.name," was already deleted from server")),setTimeout((function(){e.setNotificationMessage(null)}),5e3),e.setPersons(e.persons.filter((function(e){return e.id!==t.id})))}))}(n)},children:"delete"})]})})},f=function(e){var n=e.persons.filter((function(n){return n.name.toLowerCase().includes(e.searchTerm.toLowerCase())}));return Object(l.jsx)("div",{children:n.map((function(n){return Object(l.jsx)("div",{children:Object(l.jsx)(b,{props:e,person:n})},n.name)}))})},m=function(e){var n=e.message;if(null===n)return null;var t="notification";return n.includes("already deleted from server")&&(t="error"),Object(l.jsx)("div",{className:t,children:n})},O=function(){var e=Object(r.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],a=Object(r.useState)(""),s=Object(o.a)(a,2),i=s[0],u=s[1],b=Object(r.useState)(""),O=Object(o.a)(b,2),p=O[0],v=O[1],x=Object(r.useState)(""),g=Object(o.a)(x,2),w=g[0],N=g[1],C=Object(r.useState)(null),P=Object(o.a)(C,2),S=P[0],k=P[1];Object(r.useEffect)((function(){d.getAll().then((function(e){c(e)}))}),[]);return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(m,{message:S}),Object(l.jsx)(j,{handleSearch:function(e){N(e.target.value)},searchTerm:w,setSearchTerm:N}),Object(l.jsx)("h3",{children:"Add a new"}),Object(l.jsx)(h,{persons:t,setPersons:c,newName:i,setNewName:u,newNumber:p,setNewNumber:v,addPerson:function(e){e.preventDefault();var n={name:i,number:p};if(t.some((function(e){return e.name===i}))){console.log("duplicate");var r=t.find((function(e){return e.name===i}));r.number===p?window.alert("".concat(r.name," is already added to phonebook")):window.confirm("".concat(r.name," is already added to phonebook, replace the old number with a new one?"))&&d.update(r.id,n).then((function(e){u(""),v(""),d.getAll().then((function(e){c(e)}))}))}else d.create(n).then((function(e){c(t.concat(e)),u(""),v(""),k("Added ".concat(n.name)),setTimeout((function(){k(null)}),5e3)}))},handleNameChange:function(e){u(e.target.value)},handleNumberChange:function(e){v(e.target.value)}}),Object(l.jsx)("h3",{children:"Number"}),Object(l.jsx)(f,{setNotificationMessage:k,setPersons:c,persons:t,searchTerm:w})]})};a.a.render(Object(l.jsx)(O,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.dbfe3496.chunk.js.map