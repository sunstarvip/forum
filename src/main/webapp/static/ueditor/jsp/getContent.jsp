<%@ page language="java" pageEncoding="UTF-8"%>
<%
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");
String content = request.getParameter("myEditor");
String content1 = request.getParameter("myEditor1");


response.getWriter().print("第1个编辑器的值");
response.getWriter().print(content);
response.getWriter().print("第2个编辑器的值");
response.getWriter().print(content1);
response.getWriter().print("<input type='button' value='点击返回' onclick='window.history.go(-1)' /></script>");
%>