<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="xqlc" uri="http://www.xqlc.com/xqlc" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<xqlc:extends name="css">
     <style type="text/css">
        body {
            height: 100%;
        }
     </style>
    <xqlc:block name="style">
    </xqlc:block>
</xqlc:extends>

<xqlc:extends name="javascript">
    <script type="text/javascript">
        $(function() {
            if (window.parent.ROOT) {
                window.parent.iframeResize($('body').height());
            }
        });
    </script>

    <xqlc:block name="script">
    </xqlc:block>
</xqlc:extends>
<xqlc:extends name="body">
    <div class="banner">
        <div class="container">
            <h1 class="pull-left">
                <xqlc:block name="header">
                </xqlc:block>
            </h1>
        </div>
    </div>

    <div class="container">
        <div class="row-fluid">

            <div class="span3">
                <div class="category">
                    <xqlc:block name="nav">
                    </xqlc:block>
                </div>

                <div class="posts">
                    <xqlc:block name="post">
                    </xqlc:block>
                </div>

                <div class="contactus">
                    <xqlc:block name="contact">
                    </xqlc:block>
                </div>
            </div>

            <div class="span9">
                <xqlc:block name="content">
                </xqlc:block>
            </div>
        </div>
    </div>

    <div class="copyright">
        <div class="container">

            <div class="row-fluid">
                <div class="span8">
                    <p>2013 &copy; XQLC-UI. ALL Rights Reserved. <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                </div>
                <div class="span4">
                    <a href="${ctx}/cms/site/list"><img src="${ctx}/static/images/lib/xqlcui/logo/logo200X60.png" class="pull-right" alt="" /></a>
                </div>
            </div>
        </div>
    </div>
</xqlc:extends>

<jsp:include page="/common/BasePage.jsp" />