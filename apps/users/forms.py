from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100, required=True, 
    widget=forms.TextInput(attrs={'class': 'input100', 'placeholder':'Số điện thoại'}))
    password = forms.CharField(max_length=50, required=True, 
    widget=forms.TextInput(attrs={'type': 'password', 'class': 'input100', 'placeholder':'Mật khẩu'}))