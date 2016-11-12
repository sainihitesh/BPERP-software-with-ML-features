data = csvread('ex1data1.txt');
X = data(:, 1); y = data(:, 2);
m = length(y); % number of training examples
X = [ones(m, 1), data(:,1)]; % Add a column of ones to x
theta = zeros(2, 1); % initialize fitting parameters
iterations = 1500;
alpha = 0.01;
computeCost(X, y, theta);
theta = normalEqn(X, y);
fprintf('[%f,%f] \n', theta(1), theta(2));
