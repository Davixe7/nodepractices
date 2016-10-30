var mongoose = require('mongoose');
mongoose.promise = global.promise;

mongoose.connect('mongodb://localhost/nodefacilito');

var user_schema = new mongoose.Schema({
	username: {
		type:String,
		required: "Nombre de usuario es requerido",
		minlength:[6,"El nombre de usuario debe contener como minimo 6 caracteres"],
		maxlength:[16,"El nombre de usuario debe contener como maximo 16 caracteres"]
	},
	email:{
		type:String,
		required: "Email es requerido",
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ,"Ingresa una dirección de correo electronico valida"]
	},
	password:{
		type: String,
		required: "La contraseña es requerida",
		minlength:[6,"La contraseña debe contener como minimo 6 caracteres"],
		maxlength:[16,"La contraseña debe debe contener como maximo 16 caracteres"],
		validate: {
			validator: function(pw){
				return pw === this.password_2;
			},
			message: "Las contraseñas no coinciden"
		}
	}
});

user_schema.virtual("password_2").get(function(){
	return this.passwordConfirm;
}).set(function(pw){
	this.passwordConfirm = pw;
});

var User = mongoose.model("User", user_schema);

module.exports = User;