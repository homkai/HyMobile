define('index/tpl_nav', function(require, exports, module){

var React = require('react');

exports.App = React.createClass({displayName: "App",
    render: function(){
        return (
            React.createElement("div", {className: "abc"}, 
                React.createElement("button", {id: "cde"}, "按钮"), 
                React.createElement("input", {type: "text"})
            )
        );
    }
});

});