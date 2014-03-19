package com.darknight.forum.base.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: DarKnight
 * Date: 13-7-27
 * Time: 下午3:48
 * To change this template use File | Settings | File Templates.
 */
@MappedSuperclass
@Access(AccessType.PROPERTY)
public class BaseEntity {
    private String id;
    private Date createTime = new Date();
    private Date updateTime;

    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid2")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(updatable=false)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Column(updatable=true)
    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }else {
            if(this.getClass() != obj.getClass()) {
                return false;
            } else {
                if(this == obj) {
                    return true;
                }
                BaseEntity other = (BaseEntity)obj;
                String otherId = other.getId();
                if(otherId == null) {
                    return false;
                }else {
                    return getId().equals(otherId);
                }
            }
        }
    }
}
