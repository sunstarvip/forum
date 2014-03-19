<%@ tag pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ attribute name="id" required="true"%>
<%@ attribute name="name" required="true"%>
<%@ attribute name="value" required="true"%>
<%@ attribute name="toolbars" required="false"%>
<%@ attribute name="minFrameHeight" required="false"%>
<%@ attribute name="autoHeightEnabled" required="false"%>
<%@ attribute name="style" required="false"%>

<script type="text/plain" id="${id}" name="${name}">
${value}
</script>
<script type="text/javascript">
    var __ue_${id};
$(function() {
    __ue_${id}=new UE.ui.Editor({
        a:1
      <c:if test="${not empty toolbars }">,toolbars:[[${toolbars}]]</c:if>
      <c:if test="${not empty minFrameHeight}">,minFrameHeight:${minFrameHeight}</c:if>
      <c:if test="${not empty autoHeightEnabled}">,autoHeightEnabled:${autoHeightEnabled}</c:if>
      <c:if test="${not empty style}">,style:${style}</c:if>
    });
    __ue_${id}.render('${id}');
});
</script>