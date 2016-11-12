function [J, grad] = lrcost(theta, X, y, lambda)
m = length(y); 
J = 0;
grad = zeros(size(theta));
t = theta;
t(1) = 0;    
ht=sigmoid(X * theta);
s1=-1.*y.*log(ht);
s2=-1.*(1.-y).*log(1.-ht);
s3=lambda.*sum(t.*t)./(2.*m);
J=1./m.*sum(s1.+s2).+s3;
grad = ( (X'*(ht.-y)) .+ (lambda.*t) )./m;
end