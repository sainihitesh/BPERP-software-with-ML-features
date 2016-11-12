data=csvread('ex1data1.txt');
x=data(:,1);
y=data(:,2);
m=length(y);
X=[ones(m,1),x];
theta = (pinv(X'*X))*X'*y;
fprintf('%f',theta(2));