<%@ tag pageEncoding="UTF-8"%>
<%@tag import="java.util.List"%>
<%@tag import="com.xqlc.cms.news.version.entity.Version"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="xqlc" uri="http://www.xqlc.com/xqlc"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<%@ attribute name="id" required="true"%>
<%@ attribute name="value" type="List"required="true" %>
<%@ attribute name="fileTypeExts" required="false"%>

<script type="text/javascript">
    $(function () {
        var formSubmit = false;
        var uploadComplete = false;
        var fileVersion = [];
        $("#file_upload").uploadify({
            'method':'post',
            'auto':true,
            'buttonText':'请选择文件...',
            'buttonClass':'button',
            <c:if test="${not empty fileTypeExts}">
            'fileTypeExts': '${fileTypeExts}',
            </c:if>
            'swf':'${ctx}/static/upload/img/uploadify.swf',
            'uploader':'${ctx}/system/version/up1oad;jsessionid=<%=session.getId()%>',
            'onUploadSuccess':function (file, data, response) {
                fileVersion.push(data);
                $('#versionIds').val(fileVersion.join(","));
                $('#uploadTable > tbody').append($('<tr id="'+ data +'"><td>' + file.name + '</td>' +
                        '<td>' + file.size + '</td><td>保存后记录时间</td><td>' +
                        '<a href="${ctx}/system/version/downloadVersion/'+ data +
                        '" title="下载附件" class="btn"><i title="下载附件" class="icon-arrow-down">' +
                                '</i></a>&nbsp;<a href="javascript:deleteFile(\'' + data
                                + '\')" title="删除文件" class="btn"><i title="删除文件" class="icon-remove">' +
                        '</i></a></td></tr>'));
            }
        });
    });
    var deleteVersion = [];
    function deleteFile(id){
        $.ajax({
            type: "get",
            url: '${ctx}/system/version/delete/' + id,
            dataType: "text",
            success: function (data) {
                if(data == "success"){
                    $('#'+id).remove();
                    deleteVersion.push(id);
                    $('#deleteversionIds').val(deleteVersion.join(","));
                }

                else
                    alert('删除文件时出错');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
</script> <input type="file" name="file_upload" id="file_upload" />
<br>
<table id="uploadTable" class="table table-bordered table-striped">
	<thead>
		<tr>
			<th>文件名</th>
			<th>文件大小</th>
			<th>上传时间</th>
			<th>操作</th>
		</tr>
	</thead>
	<tbody>
		<c:forEach items="${value}" var="v">
			<tr id="${v.id}">
				<td>${v.name}</td>
				<td>${v.sizes}</td>
				<td><fmt:formatDate value="${v.createTime}"
						pattern="yyyy-MM-dd HH:mm:ss" /></td>
				<td><a href="${ctx}/system/version/downloadVersion/${v.id}"
					class="btn"><i title="下载附件" class="icon-arrow-down"></i></a> <a
					href="javascript:deleteFile('${v.id}')" class="btn"><i
						title="删除文件" class="icon-remove"></i></a></td>
			</tr>
		</c:forEach>
	</tbody>
</table>
<input type="hidden" id="versionIds" name="versionIds" value="">
<input type="hidden" id="deleteversionIds" name="deleteversionIds"
	value="">